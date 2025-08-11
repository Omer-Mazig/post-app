import {
  infiniteQueryOptions,
  queryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { postsApi } from "./posts.api";

export const postsQueryOptionsFactory = {
  // ["posts"]
  all: () => queryOptions({ queryKey: ["posts"] }),

  // ["posts", "list"]
  lists: () =>
    queryOptions({
      queryKey: [...postsQueryOptionsFactory.all().queryKey, "list"],
    }),

  // ["posts", "list", searchQuery]
  list: (searchQuery: string) =>
    infiniteQueryOptions({
      queryKey: [...postsQueryOptionsFactory.lists().queryKey, searchQuery],
      queryFn: ({ pageParam = 0 }) => postsApi.getPosts(pageParam, searchQuery),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
      // Keep showing the previous results while the new search is loading
      placeholderData: keepPreviousData,
    }),
};
