import * as React from "react";
import { type Post } from "../posts.types";
import { PostPreview } from "./post-preview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type PostsListProps = {
  posts: Post[];
  onReachEnd?: () => void;
  isFetchingMore?: boolean;
  hasNextPage?: boolean;
};

export const PostsList = ({
  posts,
  onReachEnd,
  isFetchingMore,
  hasNextPage,
}: PostsListProps) => {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  useIntersectionObserver({
    rootRef: viewportRef,
    targetRef: sentinelRef,
    onIntersect: onReachEnd,
    threshold: 0,
    rootMargin: "200px 0px 200px 0px",
    enabled: Boolean(onReachEnd),
    deps: [posts.length],
  });

  return (
    <ScrollArea
      className="h-[80vh] pr-2"
      viewportRef={viewportRef}
    >
      <div className="space-y-4">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            post={post}
          />
        ))}
        <div ref={sentinelRef} />
        {isFetchingMore && (
          <div className="py-4 text-center text-sm">Loading…</div>
        )}
        {hasNextPage === false && (
          <div className="py-4 text-center text-sm text-muted-foreground">
            No more posts
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
