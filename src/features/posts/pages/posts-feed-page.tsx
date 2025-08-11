import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../posts.api";
import { PostsList } from "../components/posts-list";

export const PostsFeedPage = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
  });

  console.log(posts);

  if (posts) {
    return <PostsList posts={posts} />;
  }

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <div>Loading...</div>;
};
