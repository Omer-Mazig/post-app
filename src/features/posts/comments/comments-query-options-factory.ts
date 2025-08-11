import { infiniteQueryOptions } from "@tanstack/react-query";
import { commentsApi } from "./comments.api";

export const commentsQueryOptionsFactory = {
  // ["posts", "comments", postId]
  listByPost: (postId: string) =>
    infiniteQueryOptions({
      queryKey: ["posts", "comments", postId],
      queryFn: ({ pageParam = 0 }) =>
        commentsApi.getComments(postId, pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
      enabled: Boolean(postId),
    }),
};
