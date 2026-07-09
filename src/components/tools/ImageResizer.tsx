"use client";

import { useCallback, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

const presets = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "Facebook Cover", width: 820, height: 312 },
  { label: "Twitter Header", width: 1500, height: 500 },
  { label: "HD 1080p", width: 1920, height: 1080 },
];

export default function ImageResizer() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  const handleFileSelect = useCallback(async (file: File | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    setError(null);

    if (!file) {
      setSourceFile(null);
      setPreviewUrl(null);
      previewRef.current = null;
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const url = URL.createObjectURL(file);
    previewRef.current = url;
    setSourceFile(file);
    setPreviewUrl(url);

    try {
      const img = await loadImage(url);
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    } catch {
      setError("Failed to load image.");
    }
  }, []);

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (lockAspect && naturalSize.w > 0) {
      setHeight(Math.round((w / naturalSize.w) * naturalSize.h));
    }
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (lockAspect && naturalSize.h > 0) {
      setWidth(Math.round((h / naturalSize.h) * naturalSize.w));
    }
  };

  const resize = useCallback(async () => {
    if (!sourceFile || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/png");
      });
      if (!blob) throw new Error("Resize failed");

      const baseName = sourceFile.name.replace(/\.[^.]+$/, "");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}-${width}x${height}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Resize failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceFile, previewUrl, width, height]);

  return (
    <div className="space-y-6">
      <ImageDropzone
        previewUrl={previewUrl}
        fileName={sourceFile?.name ?? null}
        onFileSelect={handleFileSelect}
      />
      {naturalSize.w > 0 && (
        <p className="text-center text-sm text-zinc-500">
          Original size: {naturalSize.w} × {naturalSize.h} px
        </p>
      )}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      <ToolPanel title="Dimensions">
        <div className="mb-4 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setWidth(p.width);
                setHeight(p.height);
              }}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Width (px)</label>
            <input
              type="number"
              value={width}
              min={1}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Height (px)</label>
            <input
              type="number"
              value={height}
              min={1}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={lockAspect}
            onChange={(e) => setLockAspect(e.target.checked)}
            className="accent-indigo-600"
          />
          Lock aspect ratio
        </label>
        <button
          type="button"
          onClick={resize}
          disabled={!sourceFile || isProcessing}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isProcessing ? "Resizing…" : "Resize & Download"}
        </button>
      </ToolPanel>
    </div>
  );
}
