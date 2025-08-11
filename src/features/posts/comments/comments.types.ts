import { z } from "zod";
import { CommentSchema } from "./comments.schemas";

type Comment = z.infer<typeof CommentSchema>;

type CommentsPage = {
  items: Comment[];
  nextCursor: number | undefined;
};

export type { Comment, CommentsPage };
