import { apiClient } from "@/lib/api-client";

const postsApi = {
  getPosts: async () => {
    const response = await apiClient.get("/posts");
    return response.data;
  },
};

export { postsApi };
