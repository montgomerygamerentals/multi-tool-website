"use client";

import { useCallback, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

type OutputFormat = "image/png" | "image/jpeg" | "image/webp";

interface FormatConverterProps {
  defaultOutputFormat: OutputFormat;
  accept?: string;
  lockFormat?: boolean;
  label?: string;
}

const formatExt: Record<OutputFormat, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

export default function FormatConverter({
  defaultOutputFormat,
  accept = "image/*",
  lockFormat = true,
  label,
}: FormatConverterProps) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(defaultOutputFormat);
  const [quality, setQuality] = useState(0.92);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  const handleFileSelect = useCallback((file: File | null) => {
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
  }, []);

  const convert = useCallback(async () => {
    if (!sourceFile || !previewUrl) return;
    setIsConverting(true);
    setError(null);

    try {
      const img = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (b) => resolve(b),
          outputFormat,
          outputFormat === "image/png" ? undefined : quality,
        );
      });
      if (!blob) throw new Error("Conversion failed");

      const ext = formatExt[outputFormat];
      const baseName = sourceFile.name.replace(/\.[^.]+$/, "");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [sourceFile, previewUrl, outputFormat, quality]);

  return (
    <div className="space-y-6">
      <ImageDropzone
        previewUrl={previewUrl}
        fileName={sourceFile?.name ?? null}
        onFileSelect={handleFileSelect}
        accept={accept}
      />
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      <ToolPanel title={label ?? "Output Settings"}>
        {!lockFormat && (
          <div className="mb-4 flex flex-wrap gap-2">
            {(["image/png", "image/jpeg", "image/webp"] as OutputFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setOutputFormat(f)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  outputFormat === f
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {formatExt[f].toUpperCase()}
              </button>
            ))}
          </div>
        )}
        {outputFormat !== "image/png" && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Quality: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        )}
        <button
          type="button"
          onClick={convert}
          disabled={!sourceFile || isConverting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isConverting ? "Converting…" : "Convert & Download"}
        </button>
      </ToolPanel>
    </div>
  );
}
