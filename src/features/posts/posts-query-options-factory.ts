import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { postsApi } from "./posts.api";

export const postsQueryOptionsFactory = {
  // ["posts"]
  all: () => queryOptions({ queryKey: ["posts"] }),

  // ["posts", "list"]
  lists: () =>
    queryOptions({
      queryKey: [...postsQueryOptionsFactory.all().queryKey, "list"],
    }),

  // ["posts", "list", filters]
  list: (searchQuery: string) =>
    infiniteQueryOptions({
      queryKey: [...postsQueryOptionsFactory.lists().queryKey, searchQuery],
      queryFn: ({ pageParam = 1 }) => postsApi.getPosts(pageParam, searchQuery),
      getNextPageParam: (lastPage, _pages, lastPageParam) =>
        lastPage.items.length < 10 ? undefined : lastPageParam + 1,
      initialPageParam: 1,
    }),
};
