//
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { Skeleton } from "@/components/ui/skeleton";
import { postsQueryOptionsFactory } from "../posts-query-options-factory";
import { PostCommentsSection } from "../comments/components/post-comments-section";

const PostErrorCard = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <Card className="max-w-md w-full text-center">
      <CardHeader>
        <CardTitle>Failed to load post</CardTitle>
        <CardDescription>
          Please check your connection or try again.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button onClick={onRetry}>Retry</Button>
      </CardFooter>
    </Card>
  </div>
);

const PostSkeletonCard = () => (
  <Card className="overflow-hidden">
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
      <Separator />
      <Skeleton className="h-20 w-full" />
    </div>
  </Card>
);

export const PostDetailsPage = () => {
  const { id = "" } = useParams();

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    refetch: refetchPost,
  } = useQuery(postsQueryOptionsFactory.detail(id));

  if (isErrorPost)
    return (
      <PostErrorCard onRetry={() => refetchPost({ cancelRefetch: false })} />
    );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Post */}
      {isLoadingPost ? (
        <PostSkeletonCard />
      ) : post ? (
        <>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{post.title}</CardTitle>
            <CardDescription>Posted by User #{post.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base whitespace-pre-line leading-7">
              {post.body}
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Post ID: {post.id}
          </CardFooter>
        </>
      ) : null}

      <PostCommentsSection postId={id} />
    </div>
  );
};
