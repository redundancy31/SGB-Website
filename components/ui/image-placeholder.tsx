"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  className?: string;
  label?: string;
};

export function ImagePlaceholder({ src, alt, className, label }: ImagePlaceholderProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={cn("flex items-center justify-center rounded-md border border-dashed bg-slate-100 text-slate-600", className)}>
        <div className="flex items-center gap-2 text-sm">
          <ImageIcon className="h-4 w-4" />
          <span>{label ?? "Image Placeholder"}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      className={cn("rounded-md object-cover", className)}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
