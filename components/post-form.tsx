"use client";

import { CategoryInput } from "@/components/category-input";
import { ImageUpload } from "@/components/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PostFormProps {
  type: "ANNOUNCEMENT" | "BLOG" | "GUIDE" | "SHOWCASE" | "EVENT";
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Please give your post a Title" })
    .max(100, { message: "Title must be at most 100 characters" }),
  preview: z
    .string({ required_error: "Please enter a preview" })
    .max(250, { message: "Preview must be at most 250 characters" }),
  content: z
    .string({ required_error: "Content is required" })
    .min(120, { message: "Content must be at least 120 characters" }),
  imageUrl: z.string({ required_error: "Please upload an image" }),
  categories: z
    .array(z.string())
    .min(1, { message: "Please select at least one category" }),
});

export function PostForm({ type }: PostFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      preview: "",
      content: "",
      imageUrl: "",
      categories: [],
    },
  });

  const loading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          type, // Inject post type here
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Post created successfully!");
        router.push("/posts");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create post.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Create {type}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preview</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Short preview of your post"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The main body of your post"
                    className="resize-none"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categories */}
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <CategoryInput
                    selectedCategories={field.value}
                    setSelectedCategories={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            variant="outline"
            effect="ringHover"
            type="submit"
            loading={loading}
            className="w-full"
          >
            {loading ? "Submitting..." : "Create Post"}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
