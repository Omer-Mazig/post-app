import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddPost } from "../hooks/use-add-post";
import { toast } from "sonner";

const addPostFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  body: z.string().min(10, "Content must be at least 10 characters."),
  userId: z.string(),
});

type AddPostFormValues = z.infer<typeof addPostFormSchema>;

type AddPostFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const AddPostForm = ({ onSuccess, onCancel }: AddPostFormProps) => {
  const addPost = useAddPost();
  const form = useForm<AddPostFormValues>({
    resolver: zodResolver(addPostFormSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: "1", // TODO: get user id from auth context
    },
  });

  function handleSubmit(values: AddPostFormValues) {
    addPost.mutate(
      { ...values },
      {
        onSuccess: (data) => {
          console.log("AddPostForm success:", data);
          form.reset();
          toast.success("Post added successfully");
          onSuccess?.();
        },
        onError: () => {
          toast.error("Failed to add post");
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter post title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter post content"
                  className="min-h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onCancel?.()}
            disabled={addPost.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={addPost.isPending}
          >
            {addPost.isPending ? "Submitting..." : "Create post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
