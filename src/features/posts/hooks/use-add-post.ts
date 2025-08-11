import { useMutation } from "@tanstack/react-query";
import { postsApi } from "../posts.api";
import { type Post } from "../posts.types";
import { useQueryClient } from "@tanstack/react-query";

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: Omit<Post, "id">) => postsApi.addPost(post),
    onSuccess: async () => {
      // returning the awaited promise to make the mutation wait for the query to be invalidated.
      // this is making the isPending state to be true until the query is invalidated.
      return await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
