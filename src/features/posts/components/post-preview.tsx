import React from "react";
import { Link } from "react-router-dom";
import { type Post } from "../posts.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { ConfirmDeleteDialogPost } from "./confirm-delete-dialog-post";
import { useDeletePost } from "../hooks/use-delete-post";
import { Trash2 } from "lucide-react";
import { truncateText } from "@/lib/utils";

type PostPreviewProps = {
  post: Post;
  maxChars?: number;
};

export const PostPreview = ({ post, maxChars = 80 }: PostPreviewProps) => {
  const bodyPreview = truncateText(post.body, maxChars);
  const { user } = useAuth();
  const isOwner = user?.id === post.userId;
  const deletePost = useDeletePost();
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const handleDeletePost = async () => {
    await deletePost.mutateAsync(post.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </CardTitle>
            <CardDescription>Posted by User #{post.userId}</CardDescription>
          </div>
          {isOwner && (
            <div className="flex items-center gap-2">
              <ConfirmDeleteDialogPost
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                }
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={async () => {
                  await handleDeletePost();
                  setIsDeleteOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Link
          to={`/posts/${post.id}`}
          className="block"
        >
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {bodyPreview}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Post ID: {post.id}
      </CardFooter>
    </Card>
  );
};
