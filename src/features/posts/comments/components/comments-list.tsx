import { type Comment } from "../comments.types";
import { CommentPreview } from "./comment-preview";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonList = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex gap-3"
      >
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

type CommentsListProps = {
  comments: Comment[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingMore?: boolean;
};

export const CommentsList = ({
  comments,
  isLoading,
  hasNextPage,
  isFetchingMore,
}: CommentsListProps) => {
  if (isLoading && comments.length === 0) {
    return <SkeletonList />;
  }

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <CommentPreview
          key={c.id}
          comment={c}
        />
      ))}
      {isFetchingMore && <SkeletonList count={2} />}
      {hasNextPage === false && (
        <div className="py-2 text-center text-sm text-muted-foreground">
          No more comments
        </div>
      )}
    </div>
  );
};
