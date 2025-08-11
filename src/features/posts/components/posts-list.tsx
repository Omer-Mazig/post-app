import { type Post } from "../posts.types";
import { PostPreview } from "./post-preview";
import { ScrollArea } from "@/components/ui/scroll-area";

type PostsListProps = {
  posts: Post[];
};

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <ScrollArea className="h-[80vh] pr-2">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
