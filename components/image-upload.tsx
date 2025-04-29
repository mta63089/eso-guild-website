"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadialProgress } from "@/components/ui/progress";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  image: File | null;
  setImage: (file: File | null) => void;
  uploadedUrl?: string;
  setUploadedUrl?: (url: string | null) => void;
}

export function ImageUpload({
  image,
  setImage,
  uploadedUrl,
  setUploadedUrl,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      await uploadImage(file);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setImage(file);
        await uploadImage(file);
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  const uploadImage = async (file: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const { url } = await res.json();
      if (setUploadedUrl) {
        setUploadedUrl(url);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (setUploadedUrl) {
      setUploadedUrl(null);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3 h-full">
      <div {...getRootProps()} className="h-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-accent w-full visually-hidden-focusable h-full transition"
        >
          {loading && (
            <div className="text-center max-w-md">
              <RadialProgress progress={50} />
              <p className="text-sm font-semibold">Uploading Image...</p>
              <p className="text-xs text-muted-foreground">
                Please wait, do not refresh.
              </p>
            </div>
          )}

          {!loading && !uploadedUrl && (
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <CloudUpload size="1.6em" />
              </div>
              <p className="mt-2 text-sm">
                <span className="font-semibold">Drag an image</span> here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to select manually
              </p>
            </div>
          )}

          {uploadedUrl && !loading && (
            <div className="text-center space-y-2">
              <Image
                src={uploadedUrl}
                alt="Uploaded image"
                width={500}
                height={500}
                className="rounded-md object-cover max-h-60 mx-auto"
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Image uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Click to upload a different one
                </p>
              </div>
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
          disabled={loading}
          onChange={handleImageChange}
        />
      </div>

      {!!uploadedUrl && (
        <div className="flex items-center justify-between text-sm mt-2">
          <Link
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View uploaded image
          </Link>

          <Button type="button" variant="secondary" onClick={removeImage}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
