"use client";

import { ImageUpload } from "@/components/image-upload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryInput } from "./category-input";

export function AnnouncementForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !preview || !content || !image || categories.length === 0) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload image to S3
      const imageFormData = new FormData();
      imageFormData.append("file", image);

      const uploadRes = await fetch("/api/uploads", {
        method: "POST",
        body: imageFormData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }

      const { url: uploadedImageUrl } = await uploadRes.json();

      // Step 2: Create announcement with uploaded image URL
      const res = await fetch("/api/announcements", {
        method: "POST",
        body: JSON.stringify({
          title,
          preview,
          content,
          categories,
          imageUrl: uploadedImageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Announcement created!");
        router.push("/announcements");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create announcement.");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Create Announcement</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
        </div>

        <div>
          <Label htmlFor="preview">Preview</Label>
          <Textarea
            id="preview"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            placeholder="Short preview text"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="content">Full Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Full announcement content..."
            rows={8}
          />
        </div>

        <div>
          <Label>Categories</Label>
          <CategoryInput
            selectedCategories={categories}
            setSelectedCategories={setCategories}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <Badge key={idx} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Upload Image</Label>
          <ImageUpload image={image} setImage={setImage} />
        </div>

        <Button
          type="submit"
          variant="outline"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Submitting..." : "Create Announcement"}
        </Button>
      </form>
    </div>
  );
}
