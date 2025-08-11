import { z } from "zod";
import { UserSchema } from "./auth.schemas";

type User = z.infer<typeof UserSchema>;

export type { User };
