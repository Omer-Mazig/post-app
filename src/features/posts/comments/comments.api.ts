import { apiClient } from "@/lib/api-client";
import { CommentsPageSchema } from "./comments.schemas";
import { type CommentsPage } from "./comments.types";

const commentsApi = {
  getComments: async (
    postId: string,
    cursor: number
  ): Promise<CommentsPage> => {
    const pageSize = 3;
    const urlParams = new URLSearchParams();
    urlParams.set("cursor", String(Math.max(0, cursor)));
    urlParams.set("limit", String(pageSize));
    const response = await apiClient.get(
      `/posts/${postId}/comments?${urlParams.toString()}`
    );
    const parsed = CommentsPageSchema.parse(response.data);
    return {
      items: parsed.items,
      nextCursor: parsed.nextCursor,
    };
  },
};

export { commentsApi };
