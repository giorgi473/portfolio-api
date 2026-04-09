"use client";

import { useRef } from "react";
import { Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import NextImage from "next/image";
import { toast } from "sonner";

export interface SelectedImage {
  file?: File;
  preview: string;
  isExisting?: boolean;
}

interface ImageUploadProps {
  images: SelectedImage[];
  onChange: (images: SelectedImage[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 5,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
    }));

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const removed = newImages.splice(index, 1)[0];

    if (!removed.isExisting && removed.preview) {
      URL.revokeObjectURL(removed.preview);
    }

    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1.5">
        <ImageIcon className="h-4 w-4 text-primary" />
        <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Project Images (Up to {maxImages})
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden group border border-border/40"
          >
            <NextImage
              src={img.preview}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1.5 bg-destructive/80 text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 cursor-pointer border-dashed border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Plus className="h-6 w-6" />
            <span className="text-xs font-medium">Add Image</span>
          </button>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        multiple
        className="hidden cursor-pointer"
      />
      <p className="text-xs text-muted-foreground italic">
        Showcase your project with up to {maxImages} high-quality screenshots.
      </p>
    </div>
  );
}
