import { z } from "zod";
import { PostSchema } from "./posts.schemas";

type Post = z.infer<typeof PostSchema>;

export type { Post };
