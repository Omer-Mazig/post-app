import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { postsApi } from "../posts.api";
import { postsQueryOptionsFactory } from "../posts-query-options-factory";
import type { PostsPage } from "../posts.types";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => postsApi.deletePost(postId),

    onSuccess: async (_, postId) => {
      queryClient.removeQueries({
        queryKey: postsQueryOptionsFactory.detail(postId).queryKey,
      });

      // Optimistically remove the post from all cached lists to avoid flicker after navigation
      queryClient.setQueriesData(
        {
          queryKey: postsQueryOptionsFactory.lists().queryKey,
        },
        (oldData: InfiniteData<PostsPage> | undefined) => {
          if (!oldData) return oldData;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.filter((p) => p.id !== postId),
            })),
          };
        }
      );
    },
  });
};
