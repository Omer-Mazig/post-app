import { z } from "zod";

const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

const CommentsSchema = z.array(CommentSchema);

const CommentsPageSchema = z.object({
  items: CommentsSchema,
  nextCursor: z.number().optional(),
});

export { CommentSchema, CommentsSchema, CommentsPageSchema };
