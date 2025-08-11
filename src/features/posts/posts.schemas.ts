import { z } from "zod";

const PostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string(),
});

const PostsSchema = z.array(PostSchema);

export { PostSchema, PostsSchema };
