import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { PostsList } from "../components/posts-list";
import { PostsListSkeleton } from "../components/posts-list-skeleton";
import { ErrorState } from "../components/error-state";
import { type Post } from "../posts.types";
import { useSearchParams } from "react-router-dom";
import { PostsFilter } from "../components/posts-filter";
import { postsQueryOptionsFactory } from "../posts-query-options-factory";
import { AddPostForm } from "../components/add-post-form";

export const PostsFeedPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(postsQueryOptionsFactory.list());

  const flatPosts: Post[] = React.useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  const filteredPosts: Post[] = React.useMemo(() => {
    const raw = searchQuery.trim();
    if (raw.length === 0) return flatPosts;
    const q = raw.toLowerCase();
    return flatPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q)
    );
  }, [flatPosts, searchQuery]);

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
    <div className="space-y-4">
      <AddPostForm />
      <PostsFilter />
      <PostsList
        posts={filteredPosts}
        onReachEnd={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        isFetchingMore={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
