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
  list: ({
    sort = "newest",
    tag = "all",
  }: { sort?: string; tag?: string } = {}) =>
    infiniteQueryOptions({
      queryKey: [...postsQueryOptionsFactory.lists().queryKey, sort, tag],
      queryFn: ({ pageParam = 1 }) => postsApi.getPosts(pageParam),
      getNextPageParam: (lastPage, _pages, lastPageParam) =>
        lastPage.items.length < 10 ? undefined : lastPageParam + 1,
      initialPageParam: 1,
    }),
};
