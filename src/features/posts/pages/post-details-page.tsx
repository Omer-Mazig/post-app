import * as React from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { postsQueryOptionsFactory } from "../posts-query-options-factory";
import { commentsQueryOptionsFactory } from "../comments/comments-query-options-factory";

function useInitials(nameOrEmail: string): string {
  const cleaned = (nameOrEmail || "").trim();
  if (!cleaned) return "?";
  const parts = cleaned.split(/\s+|\./g).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export const PostDetailsPage = () => {
  const { id = "" } = useParams();

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    refetch: refetchPost,
  } = useQuery(postsQueryOptionsFactory.detail(id));

  const {
    data: commentsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    refetch: refetchComments,
  } = useInfiniteQuery(commentsQueryOptionsFactory.listByPost(id));

  const flatComments = React.useMemo(
    () => commentsPages?.pages.flatMap((p) => p.items) ?? [],
    [commentsPages]
  );

  if (isErrorPost)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>Failed to load post</CardTitle>
            <CardDescription>
              Please check your connection or try again.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button onClick={() => refetchPost({ cancelRefetch: false })}>
              Retry
            </Button>
          </CardFooter>
        </Card>
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Post */}
      <Card className="overflow-hidden">
        {isLoadingPost ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Separator />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : post ? (
          <>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                {post.title}
              </CardTitle>
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
      </Card>

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>
            Share thoughts and feedback about this post.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          {isErrorComments ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <p className="text-sm text-muted-foreground">
                Failed to load comments
              </p>
              <Button
                variant="outline"
                onClick={() => refetchComments({ cancelRefetch: false })}
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {isLoadingComments && flatComments.length === 0 ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
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
              ) : (
                <>
                  <div className="space-y-4">
                    {flatComments.map((c) => (
                      <div
                        key={c.id}
                        className="flex gap-3"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {useInitials(c.name || c.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{c.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {c.email}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {c.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasNextPage === false && (
                    <div className="py-2 text-center text-sm text-muted-foreground">
                      No more comments
                    </div>
                  )}
                </>
              )}
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
    </div>
  );
};
