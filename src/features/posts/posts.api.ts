import { apiClient } from "@/lib/api-client";
import { PostSchema, PostsPageSchema } from "./posts.schemas";
import { type Post, type PostsPage } from "./posts.types";

const postsApi = {
  getPosts: async (cursor: number, searchQuery: string): Promise<PostsPage> => {
    const pageSize = 10;

    const urlParams = new URLSearchParams();
    urlParams.set("cursor", String(Math.max(0, cursor)));
    urlParams.set("limit", String(pageSize));

    // Add search query if provided
    if (searchQuery?.trim()) {
      urlParams.set("q", searchQuery.trim());
    }

    const response = await apiClient.get(`/posts?${urlParams.toString()}`);
    const parsed = PostsPageSchema.parse(response.data);

    return {
      items: parsed.items,
      nextCursor: parsed.nextCursor,
    };
  },

  addPost: async (post: Omit<Post, "id">) => {
    // DO NOT CATCH ERRORS HERE
    // Let Tanstack handle the error
    const response = await apiClient.post("/posts", post);
    const parsed = PostSchema.parse(response.data);
    return parsed;
  },

  getPostById: async (id: string): Promise<Post> => {
    const response = await apiClient.get(`/posts/${id}`);
    return PostSchema.parse(response.data);
  },
};

export { postsApi };
