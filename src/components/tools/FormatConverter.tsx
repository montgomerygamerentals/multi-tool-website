"use client";

import { useCallback, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";
import { buildIcoFromCanvas } from "@/lib/favicon/package";

export type OutputFormat = "image/png" | "image/jpeg" | "image/webp" | "image/x-icon";

interface FormatConverterProps {
  defaultOutputFormat: OutputFormat;
  accept?: string;
  lockFormat?: boolean;
  label?: string;
  /** Pre-process HEIC/HEIF uploads before drawing to canvas */
  heicSource?: boolean;
  /** Load SVG via blob URL (rasterize to PNG/JPEG/WebP) */
  svgSource?: boolean;
}

const formatExt: Record<Exclude<OutputFormat, "image/x-icon">, string> = {
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

async function fileToDrawableUrl(
  file: File,
  previewUrl: string,
  opts: { heicSource?: boolean; svgSource?: boolean },
): Promise<string> {
  const name = file.name.toLowerCase();
  const isHeic =
    opts.heicSource ||
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif");

  if (isHeic) {
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({ blob: file, toType: "image/png" });
    const blob = Array.isArray(result) ? result[0] : result;
    return URL.createObjectURL(blob as Blob);
  }

  if (opts.svgSource || file.type === "image/svg+xml" || name.endsWith(".svg")) {
    return previewUrl;
  }

  return previewUrl;
}

export default function FormatConverter({
  defaultOutputFormat,
  accept = "image/*",
  lockFormat = true,
  label,
  heicSource = false,
  svgSource = false,
}: FormatConverterProps) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(defaultOutputFormat);
  const [quality, setQuality] = useState(0.92);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const decodeUrlRef = useRef<string | null>(null);

  const revokeDecodeUrl = useCallback(() => {
    if (decodeUrlRef.current) {
      URL.revokeObjectURL(decodeUrlRef.current);
      decodeUrlRef.current = null;
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      revokeDecodeUrl();
      setError(null);

      if (!file) {
        setSourceFile(null);
        setPreviewUrl(null);
        previewRef.current = null;
        return;
      }

      const name = file.name.toLowerCase();
      const okType =
        file.type.startsWith("image/") ||
        heicSource ||
        svgSource ||
        name.endsWith(".heic") ||
        name.endsWith(".heif") ||
        name.endsWith(".svg");

      if (!okType) {
        setError("Please select a valid image file.");
        return;
      }

      const url = URL.createObjectURL(file);
      previewRef.current = url;
      setSourceFile(file);
      setPreviewUrl(url);
    },
    [heicSource, svgSource, revokeDecodeUrl],
  );

  const convert = useCallback(async () => {
    if (!sourceFile || !previewUrl) return;
    setIsConverting(true);
    setError(null);

    let drawableUrl: string | null = null;

    try {
      drawableUrl = await fileToDrawableUrl(sourceFile, previewUrl, {
        heicSource,
        svgSource,
      });
      if (drawableUrl !== previewUrl) {
        decodeUrlRef.current = drawableUrl;
      }

      const img = await loadImage(drawableUrl);
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

      const baseName = sourceFile.name.replace(/\.[^.]+$/, "");

      if (outputFormat === "image/x-icon") {
        const ico = await buildIcoFromCanvas(canvas);
        const url = URL.createObjectURL(new Blob([ico], { type: "image/x-icon" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}.ico`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (b) => resolve(b),
          outputFormat,
          outputFormat === "image/png" ? undefined : quality,
        );
      });
      if (!blob) {
        throw new Error(
          "This browser cannot encode that format. Try PNG or a different source image.",
        );
      }

      const ext = formatExt[outputFormat];
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Conversion failed. Your browser may not decode this format (AVIF/TIFF need native support).";
      setError(msg.includes("Failed") ? msg : "Conversion failed. Please try another file or format.");
    } finally {
      revokeDecodeUrl();
      setIsConverting(false);
    }
  }, [
    sourceFile,
    previewUrl,
    outputFormat,
    quality,
    heicSource,
    svgSource,
    revokeDecodeUrl,
  ]);

  const clearInputs = useCallback(() => {
    handleFileSelect(null);
    setQuality(0.1);
    setIsConverting(false);
  }, [handleFileSelect]);

  const selectableFormats: OutputFormat[] =
    defaultOutputFormat === "image/x-icon"
      ? ["image/x-icon"]
      : lockFormat
        ? [defaultOutputFormat]
        : ["image/png", "image/jpeg", "image/webp"];

  return (
    <div className="space-y-6">
      <ToolPanel title="Image" onClear={clearInputs}>
        <ImageDropzone
          previewUrl={previewUrl}
          fileName={sourceFile?.name ?? null}
          onFileSelect={handleFileSelect}
          accept={accept}
        />
      </ToolPanel>
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      <ToolPanel title={label ?? "Output Settings"}>
        {!lockFormat && selectableFormats.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectableFormats.map((f) => (
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
                {f === "image/x-icon" ? "ICO" : formatExt[f].toUpperCase()}
              </button>
            ))}
          </div>
        )}
        {outputFormat !== "image/png" && outputFormat !== "image/x-icon" && (
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
