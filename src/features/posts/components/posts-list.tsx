import { type Post } from "../posts.types";

type PostsListProps = {
  posts: Post[];
};

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
