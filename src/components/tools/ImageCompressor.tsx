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

export default function ImageCompressor() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">(
    "image/jpeg",
  );
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  const handleFileSelect = useCallback((file: File | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    setError(null);
    setCompressedSize(null);

    if (!file) {
      setSourceFile(null);
      setPreviewUrl(null);
      setOriginalSize(null);
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
    setOriginalSize(file.size);
  }, []);

  const compress = useCallback(async () => {
    if (!sourceFile || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), format, quality);
      });
      if (!blob) throw new Error("Compression failed");

      setCompressedSize(blob.size);
      const ext = format === "image/webp" ? "webp" : "jpg";
      const baseName = sourceFile.name.replace(/\.[^.]+$/, "");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}-compressed.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Compression failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceFile, previewUrl, format, quality]);

  const savings =
    originalSize && compressedSize
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : null;

  return (
    <div className="space-y-6">
      <ImageDropzone
        previewUrl={previewUrl}
        fileName={sourceFile?.name ?? null}
        onFileSelect={handleFileSelect}
      />
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      <ToolPanel title="Compression Settings">
        <div className="mb-4 flex flex-wrap gap-2">
          {(["image/jpeg", "image/webp"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                format === f
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {f === "image/jpeg" ? "JPEG" : "WebP"}
            </button>
          ))}
        </div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Quality: {Math.round(quality * 100)}%
        </label>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.01}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="mb-4 w-full accent-indigo-600"
        />
        {originalSize && (
          <p className="mb-4 text-sm text-zinc-500">
            Original: {(originalSize / 1024).toFixed(1)} KB
            {compressedSize &&
              ` → Compressed: ${(compressedSize / 1024).toFixed(1)} KB (${savings}% smaller)`}
          </p>
        )}
        <button
          type="button"
          onClick={compress}
          disabled={!sourceFile || isProcessing}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isProcessing ? "Compressing…" : "Compress & Download"}
        </button>
      </ToolPanel>
      <p className="text-center text-xs text-zinc-500">
        Processed locally — your images never leave your device.
      </p>
    </div>
  );
}
