import { z } from "zod";
import { PostSchema } from "./posts.schemas";

type Post = z.infer<typeof PostSchema>;

type PostsPage = {
  items: Post[];
  nextCursor: number | undefined;
};

export type { Post, PostsPage };
