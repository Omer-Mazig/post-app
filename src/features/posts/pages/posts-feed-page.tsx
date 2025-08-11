import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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

  if (isError)
    return (
      <ErrorState
        title="Failed to load posts"
        message="Please check your connection or try again."
        onRetry={() => fetchNextPage({ cancelRefetch: false })}
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
