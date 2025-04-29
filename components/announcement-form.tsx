"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryInput } from "./category-input";
import ImageUpload from "./image-upload";
import { Badge } from "./ui/badge";

export function AnnouncementForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  // const [newCategory, setNewCategory] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const categories = ["announcement", "gossip"];
  // const handleCategoryAdd = () => {
  //   if (newCategory && !categories.includes(newCategory)) {
  //     setCategories([...categories, newCategory]);
  //     setNewCategory("");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !preview || !content) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Upload image to S3, for now we fake a URL
      const fakeImageUrl = "https://via.placeholder.com/640x360";

      const res = await fetch("/api/announcements", {
        method: "POST",
        body: JSON.stringify({
          title,
          preview,
          content,
          imageUrl: fakeImageUrl,
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
      console.error("Error submitting:", error);
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
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <Label>Preview</Label>
          <Textarea
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label>Full Content</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
        </div>

        <div>
          <Label>Categories</Label>
          <div className="gap-2 flex flex-1 w-full justify-items-stretch">
            <CategoryInput />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <Badge variant="secondary" key={idx}>
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Upload Image</Label>
          <ImageUpload />
        </div>

        <Button
          variant="outline"
          effect="ringHover"
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Submitting..." : "Create Announcement"}
        </Button>
      </form>
    </div>
  );
}
