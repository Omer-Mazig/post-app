import { z } from "zod";

const PostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string(),
});

const PostsSchema = z.array(PostSchema);

const PostsPageSchema = z.object({
  items: PostsSchema,
  nextCursor: z.number().optional(),
});

export { PostSchema, PostsSchema, PostsPageSchema };
