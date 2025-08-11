import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { postsApi } from "../posts.api";
import { PostsList } from "../components/posts-list";
import { PostsListSkeleton } from "../components/posts-list-skeleton";
import { ErrorState } from "../components/error-state";
import { type Post } from "../posts.types";

export const PostsFeedPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => postsApi.getPosts(pageParam),
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.items.length < 10 ? undefined : lastPageParam + 1,
    initialPageParam: 1,
  });

  const flatPosts: Post[] = React.useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  // Show a toast when there is an error during fetching more, but keep already loaded posts visible
  React.useEffect(() => {
    if (isError && flatPosts.length > 0) {
      const description = error instanceof Error ? error.message : undefined;
      toast.error("Failed to load more posts", {
        description,
        action: {
          label: "Retry",
          onClick: () => fetchNextPage({ cancelRefetch: false }),
        },
      });
    }
  }, [isError, flatPosts.length, error, fetchNextPage]);

  // Only show the full-screen error when there is no data yet
  if (isError && flatPosts.length === 0)
    return (
      <ErrorState
        title="Failed to load posts"
        message="Please check your connection or try again."
        onRetry={() => refetch({ cancelRefetch: false })}
        retryLabel="Retry"
      />
    );
  if (isLoading) return <PostsListSkeleton />;

  return (
    <PostsList
      posts={flatPosts}
      onReachEnd={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      isFetchingMore={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
};
