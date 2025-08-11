import { useMutation } from "@tanstack/react-query";
import { postsApi } from "../posts.api";
import { type Post } from "../posts.types";

export const useAddPost = () => {
  return useMutation({
    mutationFn: (post: Omit<Post, "id">) => postsApi.addPost(post),
  });
};
