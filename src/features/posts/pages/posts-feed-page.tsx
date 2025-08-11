import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { PostsList } from "../components/posts-list";
import { PostsListSkeleton } from "../components/posts-list-skeleton";
import { ErrorState } from "../components/error-state";
import { type Post } from "../posts.types";
import { useSearchParams } from "react-router-dom";
import { PostsFilter } from "../components/posts-filter";
import { postsQueryOptionsFactory } from "../posts-query-options-factory";
import { AddPostForm } from "../components/add-post-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { Separator } from "@/components/ui/separator";

export const PostsFeedPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [isAddPostOpen, setIsAddPostOpen] = React.useState(false);
  const { user } = useAuth();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(postsQueryOptionsFactory.list(searchQuery));

  const flatPosts: Post[] = React.useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  // Show a toast when there is an error during fetching more, but keep already loaded posts visible
  React.useEffect(() => {
    if (isError && flatPosts.length > 0) {
      const description = error instanceof Error ? error.message : undefined;
      toast.error("Failed to load more posts", {
        description,
        action: {
          label: "Retry",
          onClick: () => fetchNextPage({ cancelRefetch: false }),
        },
      });
    }
  }, [isError, flatPosts.length, error, fetchNextPage]);

  // Only show the full-screen error when there is no data yet
  if (isError && flatPosts.length === 0)
    return (
      <ErrorState
        title="Failed to load posts"
        message="Please check your connection or try again."
        onRetry={() => refetch({ cancelRefetch: false })}
        retryLabel="Retry"
      />
    );

  // Only show skeleton on initial load with no data
  if (isLoading && !data) return <PostsListSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <PostsFilter />
        <Button onClick={() => setIsAddPostOpen(true)}>New Post</Button>
      </div>

      <Separator />

      {user && (
        <Dialog
          open={isAddPostOpen}
          onOpenChange={setIsAddPostOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new post</DialogTitle>
              <DialogDescription>
                Share your thoughts with the community.
              </DialogDescription>
            </DialogHeader>
            <AddPostForm
              onSuccess={() => setIsAddPostOpen(false)}
              onCancel={() => setIsAddPostOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
      <PostsList
        posts={flatPosts}
        onReachEnd={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        isFetchingMore={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
