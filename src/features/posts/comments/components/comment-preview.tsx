import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Comment } from "../comments.types";

type CommentPreviewProps = {
  comment: Comment;
};

function getInitials(nameOrEmail: string): string {
  const cleaned = (nameOrEmail || "").trim();
  if (!cleaned) return "?";
  const parts = cleaned.split(/\s+|\./g).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export const CommentPreview = ({ comment }: CommentPreviewProps) => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          {getInitials(comment.name || comment.email)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{comment.name}</p>
          <span className="text-xs text-muted-foreground">{comment.email}</span>
        </div>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {comment.body}
        </p>
      </div>
    </div>
  );
};
