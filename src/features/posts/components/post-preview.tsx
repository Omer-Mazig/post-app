import { type Post } from "../posts.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">{post.title}</CardTitle>
        <CardDescription>Posted by User #{post.userId}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {bodyPreview}
        </p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Post ID: {post.id}
      </CardFooter>
    </Card>
  );
};
