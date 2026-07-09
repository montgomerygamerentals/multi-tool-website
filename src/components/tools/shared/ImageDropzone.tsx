"use client";

import { useCallback, useRef } from "react";

interface ImageDropzoneProps {
  previewUrl: string | null;
  fileName: string | null;
  onFileSelect: (file: File | null) => void;
  accept?: string;
  hint?: string;
}

export default function ImageDropzone({
  previewUrl,
  fileName,
  onFileSelect,
  accept = "image/*",
  hint = "PNG, JPEG, WebP, GIF, and more",
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect],
  );

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white px-6 py-12 transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/20"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
      />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="mb-4 max-h-48 rounded-lg object-contain"
        />
      ) : (
        <div className="mb-4 text-5xl">📁</div>
      )}
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {fileName ?? "Drop an image here or click to browse"}
      </p>
      <p className="mt-1 text-xs text-zinc-500">{hint}</p>
    </div>
  );
}
