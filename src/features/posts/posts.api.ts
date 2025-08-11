import { apiClient } from "@/lib/api-client";
import { PostsSchema } from "./posts.schemas";
import { type Post } from "./posts.types";

const postsApi = {
  getPosts: async (
    page: number
  ): Promise<{
    items: Post[];
    nextCursor: number | undefined;
  }> => {
    const limit = 10;

    const urlParams = new URLSearchParams();
    const start = (page - 1) * limit;
    urlParams.set("_start", start.toString());
    urlParams.set("_limit", limit.toString());
    urlParams.set("_sort", "id"); // Sort by id in ascending order (just for the demo)
    urlParams.set("_order", "asc");

    // DO NOT CATCH ERRORS HERE
    // Let Tanstack handle the error
    const response = await apiClient.get(`/posts?${urlParams.toString()}`);
    const parsed = PostsSchema.parse(response.data);

    const items: Post[] = parsed;
    const hasMore = items.length === limit;
    const nextCursor = hasMore ? page + 1 : undefined;

    // Uncomment this to test the error state
    // throw new Error("test");

    return {
      items,
      nextCursor,
    };
  },
};

export { postsApi };
