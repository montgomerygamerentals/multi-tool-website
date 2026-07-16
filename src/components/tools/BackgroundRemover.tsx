"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

type SampleMode = "auto" | "pick";
type MatchMode = "edges" | "all";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

function colorDistance(a: Rgb, b: Rgb): number {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function sampleCorners(data: Uint8ClampedArray, w: number, h: number): Rgb {
  const points = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
    [Math.floor(w / 2), 0],
    [Math.floor(w / 2), h - 1],
    [0, Math.floor(h / 2)],
    [w - 1, Math.floor(h / 2)],
  ];
  let r = 0;
  let g = 0;
  let b = 0;
  for (const [x, y] of points) {
    const i = (y * w + x) * 4;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  const n = points.length;
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) };
}

function getPixelRgb(data: Uint8ClampedArray, i: number): Rgb {
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
}

function rgbToCss(c: Rgb): string {
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

/** Map UI tolerance 0–100 to max Euclidean RGB distance (~0–441). */
function toleranceToMaxDistance(tolerance: number): number {
  return (tolerance / 100) * 255 * Math.sqrt(3);
}

function removeByColorMatch(
  source: ImageData,
  target: Rgb,
  tolerance: number,
  softEdges: boolean,
): ImageData {
  const { width, height, data } = source;
  const out = new ImageData(new Uint8ClampedArray(data), width, height);
  const maxDist = toleranceToMaxDistance(tolerance);
  const softBand = softEdges ? Math.max(8, maxDist * 0.25) : 0;

  for (let i = 0; i < out.data.length; i += 4) {
    const dist = colorDistance(getPixelRgb(out.data, i), target);
    if (dist <= maxDist) {
      out.data[i + 3] = 0;
    } else if (softEdges && dist < maxDist + softBand) {
      const t = (dist - maxDist) / softBand;
      out.data[i + 3] = Math.round(out.data[i + 3] * t);
    }
  }
  return out;
}

function removeFromEdges(
  source: ImageData,
  target: Rgb,
  tolerance: number,
  softEdges: boolean,
): ImageData {
  const { width, height, data } = source;
  const out = new ImageData(new Uint8ClampedArray(data), width, height);
  const maxDist = toleranceToMaxDistance(tolerance);
  const visited = new Uint8Array(width * height);
  const queue: number[] = [];

  const enqueue = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (colorDistance(getPixelRgb(out.data, i), target) > maxDist) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (queue.length > 0) {
    const idx = queue.pop()!;
    const x = idx % width;
    const y = Math.floor(idx / width);
    out.data[idx * 4 + 3] = 0;
    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  if (softEdges) {
    const softBand = Math.max(8, maxDist * 0.25);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (visited[idx]) continue;
        const i = idx * 4;
        const dist = colorDistance(getPixelRgb(out.data, i), target);
        if (dist >= maxDist && dist < maxDist + softBand) {
          // Only soften pixels adjacent to removed ones
          let nearRemoved = false;
          for (const [dx, dy] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ] as const) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            if (visited[ny * width + nx]) {
              nearRemoved = true;
              break;
            }
          }
          if (nearRemoved) {
            const t = (dist - maxDist) / softBand;
            out.data[i + 3] = Math.round(out.data[i + 3] * t);
          }
        }
      }
    }
  }

  return out;
}

const checkerStyle = {
  backgroundColor: "#fff",
  backgroundImage:
    "linear-gradient(45deg, #d4d4d8 25%, transparent 25%), linear-gradient(-45deg, #d4d4d8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d4d4d8 75%), linear-gradient(-45deg, transparent 75%, #d4d4d8 75%)",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
} as const;

export default function BackgroundRemover() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [sampleMode, setSampleMode] = useState<SampleMode>("auto");
  const [matchMode, setMatchMode] = useState<MatchMode>("edges");
  const [targetColor, setTargetColor] = useState<Rgb>({ r: 255, g: 255, b: 255 });
  const [tolerance, setTolerance] = useState(28);
  const [softEdges, setSoftEdges] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const resultRef = useRef<string | null>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewImgRef = useRef<HTMLImageElement | null>(null);

  const revokeResult = useCallback(() => {
    if (resultRef.current) {
      URL.revokeObjectURL(resultRef.current);
      resultRef.current = null;
    }
    setResultUrl(null);
  }, []);

  const handleFileSelect = useCallback(
    async (file: File | null) => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      revokeResult();
      setError(null);
      sourceCanvasRef.current = null;

      if (!file) {
        setSourceFile(null);
        setPreviewUrl(null);
        previewRef.current = null;
        setNaturalSize({ w: 0, h: 0 });
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

        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Canvas unavailable");
        ctx.drawImage(img, 0, 0);
        sourceCanvasRef.current = canvas;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setTargetColor(sampleCorners(imageData.data, canvas.width, canvas.height));
      } catch {
        setError("Failed to load image.");
      }
    },
    [revokeResult],
  );

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    };
  }, []);

  const process = useCallback(async () => {
    const canvas = sourceCanvasRef.current;
    if (!canvas || !sourceFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Let the loading state paint before heavy pixel work
      await new Promise((resolve) => setTimeout(resolve, 20));

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Canvas unavailable");
      const source = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const result =
        matchMode === "edges"
          ? removeFromEdges(source, targetColor, tolerance, softEdges)
          : removeByColorMatch(source, targetColor, tolerance, softEdges);

      const out = document.createElement("canvas");
      out.width = canvas.width;
      out.height = canvas.height;
      const outCtx = out.getContext("2d");
      if (!outCtx) throw new Error("Canvas unavailable");
      outCtx.putImageData(result, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => {
        out.toBlob((b) => resolve(b), "image/png");
      });
      if (!blob) throw new Error("Processing failed");

      revokeResult();
      const url = URL.createObjectURL(blob);
      resultRef.current = url;
      setResultUrl(url);
    } catch {
      setError("Could not remove the background. Try adjusting tolerance.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceFile, matchMode, targetColor, tolerance, softEdges, revokeResult]);

  const download = useCallback(() => {
    if (!resultUrl || !sourceFile) return;
    const baseName = sourceFile.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${baseName}-transparent.png`;
    a.click();
  }, [resultUrl, sourceFile]);

  const handlePreviewClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (sampleMode !== "pick" || !previewImgRef.current || !sourceCanvasRef.current) {
      return;
    }
    const img = previewImgRef.current;
    const rect = img.getBoundingClientRect();
    const scaleX = naturalSize.w / rect.width;
    const scaleY = naturalSize.h / rect.height;
    const x = Math.min(
      naturalSize.w - 1,
      Math.max(0, Math.floor((e.clientX - rect.left) * scaleX)),
    );
    const y = Math.min(
      naturalSize.h - 1,
      Math.max(0, Math.floor((e.clientY - rect.top) * scaleY)),
    );
    const ctx = sourceCanvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setTargetColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    revokeResult();
  };

  const idleBtn =
    "rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700";
  const activeBtn =
    "rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700";

  return (
    <div className="space-y-6">
      <ImageDropzone
        previewUrl={null}
        fileName={sourceFile?.name ?? null}
        onFileSelect={handleFileSelect}
        hint="PNG, JPEG, WebP — best with solid or simple backgrounds"
      />

      {previewUrl && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Original
              {sampleMode === "pick" ? " — click to sample color" : ""}
            </p>
            <div
              className="flex items-center justify-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700"
              style={checkerStyle}
            >
              <img
                ref={previewImgRef}
                src={previewUrl}
                alt="Original"
                onClick={handlePreviewClick}
                className={`max-h-64 w-full object-contain ${
                  sampleMode === "pick" ? "cursor-crosshair" : ""
                }`}
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Result
            </p>
            <div
              className="flex min-h-[8rem] items-center justify-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700"
              style={checkerStyle}
            >
              {resultUrl ? (
                <img
                  src={resultUrl}
                  alt="Transparent result"
                  className="max-h-64 w-full object-contain"
                />
              ) : (
                <p className="px-4 py-12 text-center text-sm text-zinc-500">
                  Remove background to preview transparency
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {naturalSize.w > 0 && (
        <p className="text-center text-sm text-zinc-500">
          {naturalSize.w} × {naturalSize.h} px
        </p>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      <ToolPanel title="Settings">
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium">Background color</p>
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSampleMode("auto");
                const canvas = sourceCanvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) return;
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                setTargetColor(
                  sampleCorners(imageData.data, canvas.width, canvas.height),
                );
                revokeResult();
              }}
              className={sampleMode === "auto" ? activeBtn : idleBtn}
            >
              Auto (corners)
            </button>
            <button
              type="button"
              onClick={() => setSampleMode("pick")}
              className={sampleMode === "pick" ? activeBtn : idleBtn}
            >
              Pick from image
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="h-9 w-9 shrink-0 rounded-lg border border-zinc-300 dark:border-zinc-600"
              style={{ backgroundColor: rgbToCss(targetColor) }}
              title={rgbToCss(targetColor)}
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {rgbToCss(targetColor)}
              {sampleMode === "pick"
                ? " — click the original image to change"
                : " — averaged from edges"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium">Removal mode</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setMatchMode("edges");
                revokeResult();
              }}
              className={matchMode === "edges" ? activeBtn : idleBtn}
            >
              Connected to edges
            </button>
            <button
              type="button"
              onClick={() => {
                setMatchMode("all");
                revokeResult();
              }}
              className={matchMode === "all" ? activeBtn : idleBtn}
            >
              All matching pixels
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Edge mode keeps interior colors (e.g. white text). All-match removes
            every similar pixel.
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 flex items-center justify-between text-sm font-medium">
            <span>Tolerance</span>
            <span className="font-normal text-zinc-500">{tolerance}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={tolerance}
            onChange={(e) => {
              setTolerance(Number(e.target.value));
              revokeResult();
            }}
            className="w-full accent-indigo-600"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Higher values remove more of the background (and may clip the subject).
          </p>
        </div>

        <label className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={softEdges}
            onChange={(e) => {
              setSoftEdges(e.target.checked);
              revokeResult();
            }}
            className="accent-indigo-600"
          />
          Soft edges (smoother transparency)
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={process}
            disabled={!sourceFile || isProcessing}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isProcessing ? "Removing…" : "Remove background"}
          </button>
          <button
            type="button"
            onClick={download}
            disabled={!resultUrl}
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Download PNG
          </button>
        </div>
      </ToolPanel>
    </div>
  );
}
