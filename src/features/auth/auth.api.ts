import { apiClient } from "@/lib/api-client";
import { UserSchema } from "./auth.schemas";
import { type User } from "./auth.types";

const authApi = {
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get("/me");
    return UserSchema.parse(response.data);
  },
};

export { authApi };
