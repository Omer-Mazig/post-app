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

type PostPreviewProps = {
  post: Post;
  maxChars?: number;
};

function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars).trim();
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const result =
    lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated;
  return `${result}…`;
}

export const PostPreview = ({ post, maxChars = 80 }: PostPreviewProps) => {
  const bodyPreview = truncateText(post.body, maxChars);
  const { user } = useAuth();
  const isOwner = user?.id === post.userId;

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
              <Button
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
              <ConfirmDeleteDialogPost
                trigger={
                  <Button
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                }
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
