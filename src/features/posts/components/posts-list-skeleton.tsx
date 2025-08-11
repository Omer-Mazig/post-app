import { ScrollArea } from "@/components/ui/scroll-area";
import { PostPreviewSkeleton } from "./post-preview-skeleton";

type PostsListSkeletonProps = {
  items?: number;
};

export const PostsListSkeleton = ({ items = 6 }: PostsListSkeletonProps) => {
  return (
    <ScrollArea className="h-[80vh] pr-2">
      <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
          <PostPreviewSkeleton key={index} />
        ))}
      </div>
    </ScrollArea>
  );
};
