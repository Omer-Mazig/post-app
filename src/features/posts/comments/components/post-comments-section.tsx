import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CommentsList } from "./comments-list";
import { commentsQueryOptionsFactory } from "../comments-query-options-factory";

type PostCommentsSectionProps = {
  postId: string;
};

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex flex-col items-center gap-3 py-8">
    <p className="text-sm text-muted-foreground">Failed to load comments</p>
    <Button
      variant="outline"
      onClick={onRetry}
    >
      Retry
    </Button>
  </div>
);

export const PostCommentsSection = ({ postId }: PostCommentsSectionProps) => {
  const {
    data: commentsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery(commentsQueryOptionsFactory.listByPost(postId));

  const flatComments = React.useMemo(
    () => commentsPages?.pages.flatMap((p) => p.items) ?? [],
    [commentsPages]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          Share thoughts and feedback about this post.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        {isError ? (
          <ErrorState onRetry={() => refetch({ cancelRefetch: false })} />
        ) : (
          <div className="space-y-4">
            <CommentsList
              comments={flatComments}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              isFetchingMore={isFetchingNextPage}
            />
          </div>
        )}
      </CardContent>
      {hasNextPage && (
        <CardFooter className="justify-center">
          <Button
            variant="secondary"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
