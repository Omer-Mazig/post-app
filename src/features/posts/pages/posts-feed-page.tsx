import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postsApi } from "../posts.api";
import { PostsList } from "../components/posts-list";
import { type Post } from "../posts.types";
// Scroll and IO handled inside PostsList

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
      lastPage.items.length < 10 ? undefined : (lastPageParam as number) + 1,
    initialPageParam: 1,
  });

  const flatPosts: Post[] = React.useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

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
