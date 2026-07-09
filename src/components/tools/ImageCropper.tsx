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

export default function ImageCropper() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
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
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setImgSize({ w, h });
      const size = Math.min(w, h, 300);
      setCrop({ x: Math.floor((w - size) / 2), y: Math.floor((h - size) / 2), w: size, h: size });
    } catch {
      setError("Failed to load image.");
    }
  }, []);

  const cropImage = useCallback(async () => {
    if (!sourceFile || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = crop.w;
      canvas.height = crop.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/png");
      });
      if (!blob) throw new Error("Crop failed");

      const baseName = sourceFile.name.replace(/\.[^.]+$/, "");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}-cropped.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Crop failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceFile, previewUrl, crop]);

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
      {imgSize.w > 0 && (
        <ToolPanel title="Crop Region (pixels)">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(["x", "y", "w", "h"] as const).map((key) => (
              <div key={key}>
                <label className="mb-1 block text-sm font-medium uppercase">
                  {key}
                </label>
                <input
                  type="number"
                  min={0}
                  max={key === "x" || key === "w" ? imgSize.w : imgSize.h}
                  value={crop[key]}
                  onChange={(e) =>
                    setCrop((c) => ({ ...c, [key]: Number(e.target.value) }))
                  }
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const s = Math.min(imgSize.w, imgSize.h);
                setCrop({ x: Math.floor((imgSize.w - s) / 2), y: Math.floor((imgSize.h - s) / 2), w: s, h: s });
              }}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium dark:bg-zinc-800"
            >
              Square
            </button>
            <button
              type="button"
              onClick={() => setCrop({ x: 0, y: 0, w: imgSize.w, h: imgSize.h })}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium dark:bg-zinc-800"
            >
              Full Image
            </button>
          </div>
          <button
            type="button"
            onClick={cropImage}
            disabled={!sourceFile || isProcessing}
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isProcessing ? "Cropping…" : "Crop & Download"}
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
