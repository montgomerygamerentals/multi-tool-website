"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

type CropRect = { x: number; y: number; w: number; h: number };
type Handle = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
type CropShape = "rect" | "circle";

const MIN_CROP = 20;

const ASPECT_PRESETS: { label: string; value: number | null }[] = [
  { label: "Free", value: null },
  { label: "Square", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
];

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

function clampCrop(crop: CropRect, imgW: number, imgH: number): CropRect {
  let { x, y, w, h } = crop;
  w = Math.max(MIN_CROP, Math.min(w, imgW));
  h = Math.max(MIN_CROP, Math.min(h, imgH));
  x = Math.max(0, Math.min(x, imgW - w));
  y = Math.max(0, Math.min(y, imgH - h));
  return {
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(w),
    h: Math.round(h),
  };
}

function forceSquare(crop: CropRect, imgW: number, imgH: number): CropRect {
  const side = Math.min(crop.w, crop.h, imgW, imgH);
  const x = crop.x + (crop.w - side) / 2;
  const y = crop.y + (crop.h - side) / 2;
  return clampCrop({ x, y, w: side, h: side }, imgW, imgH);
}

function centeredCrop(
  imgW: number,
  imgH: number,
  aspect: number | null,
): CropRect {
  if (aspect == null) {
    const w = Math.round(imgW * 0.8);
    const h = Math.round(imgH * 0.8);
    return clampCrop(
      { x: (imgW - w) / 2, y: (imgH - h) / 2, w, h },
      imgW,
      imgH,
    );
  }

  let w = imgW * 0.8;
  let h = w / aspect;
  if (h > imgH * 0.8) {
    h = imgH * 0.8;
    w = h * aspect;
  }
  return clampCrop(
    { x: (imgW - w) / 2, y: (imgH - h) / 2, w, h },
    imgW,
    imgH,
  );
}

function applyAspect(crop: CropRect, aspect: number, imgW: number, imgH: number): CropRect {
  let { x, y, w } = crop;
  let h = w / aspect;
  if (h > imgH) {
    h = imgH;
    w = h * aspect;
  }
  if (w > imgW) {
    w = imgW;
    h = w / aspect;
  }
  return clampCrop({ x, y, w, h }, imgW, imgH);
}

export default function ImageCropper() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 200, h: 200 });
  const [aspect, setAspect] = useState<number | null>(null);
  const [shape, setShape] = useState<CropShape>("rect");
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    handle: Handle;
    startX: number;
    startY: number;
    startCrop: CropRect;
  } | null>(null);

  const scale = displaySize.w > 0 && imgSize.w > 0 ? displaySize.w / imgSize.w : 1;
  const cropRef = useRef(crop);
  const aspectRef = useRef(aspect);
  const shapeRef = useRef(shape);
  const scaleRef = useRef(scale);
  const imgSizeRef = useRef(imgSize);

  cropRef.current = crop;
  aspectRef.current = aspect;
  shapeRef.current = shape;
  scaleRef.current = scale;
  imgSizeRef.current = imgSize;

  const measureDisplay = useCallback(() => {
    const el = stageRef.current?.querySelector("img");
    if (!el) return;
    setDisplaySize({ w: el.clientWidth, h: el.clientHeight });
  }, []);

  useEffect(() => {
    if (!previewUrl) return;
    measureDisplay();
    window.addEventListener("resize", measureDisplay);
    return () => window.removeEventListener("resize", measureDisplay);
  }, [previewUrl, imgSize, measureDisplay]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      const { w: imgW, h: imgH } = imgSizeRef.current;
      const currentScale = scaleRef.current;
      if (!drag || imgW === 0 || currentScale === 0) return;

      const dx = (e.clientX - drag.startX) / currentScale;
      const dy = (e.clientY - drag.startY) / currentScale;
      const { startCrop: s, handle } = drag;
      let next: CropRect = { ...s };
      const currentAspect =
        shapeRef.current === "circle" ? 1 : aspectRef.current;

      if (handle === "move") {
        next = { ...s, x: s.x + dx, y: s.y + dy };
      } else {
        let { x, y, w, h } = s;
        if (handle.includes("e")) w = s.w + dx;
        if (handle.includes("w")) {
          w = s.w - dx;
          x = s.x + dx;
        }
        if (handle.includes("s")) h = s.h + dy;
        if (handle.includes("n")) {
          h = s.h - dy;
          y = s.y + dy;
        }

        if (currentAspect != null) {
          if (handle === "e" || handle === "w") {
            h = w / currentAspect;
            if (handle === "w") y = s.y + s.h - h;
          } else if (handle === "n" || handle === "s") {
            w = h * currentAspect;
            if (handle === "n") x = s.x + s.w - w;
          } else if (Math.abs(dx) * currentAspect > Math.abs(dy)) {
            h = w / currentAspect;
            if (handle.includes("n")) y = s.y + s.h - h;
          } else {
            w = h * currentAspect;
            if (handle.includes("w")) x = s.x + s.w - w;
          }
        }

        next = { x, y, w, h };
      }

      let clamped = clampCrop(next, imgW, imgH);
      if (shapeRef.current === "circle") {
        clamped = forceSquare(clamped, imgW, imgH);
      }
      setCrop(clamped);
    };

    const onUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const handleFileSelect = useCallback(async (file: File | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    setError(null);

    if (!file) {
      setSourceFile(null);
      setPreviewUrl(null);
      previewRef.current = null;
      setImgSize({ w: 0, h: 0 });
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
      setAspect(null);
      setShape("rect");
      setCrop(centeredCrop(w, h, null));
    } catch {
      setError("Failed to load image.");
    }
  }, []);

  const setAspectPreset = (value: number | null) => {
    if (shape === "circle") return;
    setAspect(value);
    if (imgSize.w === 0) return;
    if (value == null) return;
    setCrop((c) => applyAspect(c, value, imgSize.w, imgSize.h));
  };

  const setCropShape = (next: CropShape) => {
    setShape(next);
    if (imgSize.w === 0) return;
    if (next === "circle") {
      setAspect(1);
      setCrop((c) => forceSquare(c, imgSize.w, imgSize.h));
    }
  };

  const onPointerDown = (handle: Handle) => (e: ReactPointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: cropRef.current,
    };
  };

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

      if (shape === "circle") {
        ctx.clearRect(0, 0, crop.w, crop.h);
        ctx.beginPath();
        ctx.arc(crop.w / 2, crop.h / 2, Math.min(crop.w, crop.h) / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/png");
      });
      if (!blob) throw new Error("Crop failed");

      const baseName = sourceFile.name.replace(/\.[^.]+$/, "");
      const suffix = shape === "circle" ? "circle" : "cropped";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}-${suffix}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Crop failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceFile, previewUrl, crop, shape]);

  const handles: Handle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
  const isCircle = shape === "circle";
  const activeAspect = isCircle ? 1 : aspect;

  return (
    <div className="space-y-6">
      {!previewUrl ? (
        <ImageDropzone
          previewUrl={null}
          fileName={null}
          onFileSelect={handleFileSelect}
        />
      ) : (
        <ToolPanel title="Adjust crop">
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Drag the {isCircle ? "circle" : "box"} to move it. Use the corners
            and edges to resize. The bright area is what you&apos;ll keep
            {isCircle ? " (exported as a transparent PNG circle)" : ""}.
          </p>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Shape
            </span>
            {(
              [
                { id: "rect" as const, label: "Rectangle" },
                { id: "circle" as const, label: "Circle" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setCropShape(option.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  shape === option.id
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {ASPECT_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  disabled={isCircle}
                  onClick={() => setAspectPreset(preset.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    !isCircle && activeAspect === preset.value
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleFileSelect(null)}
              className="text-sm font-medium text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline dark:hover:text-zinc-200"
            >
              Change image
            </button>
          </div>

          <div
            ref={stageRef}
            className="relative mx-auto w-fit max-w-full touch-none select-none overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <img
              src={previewUrl}
              alt="Image to crop"
              draggable={false}
              onLoad={measureDisplay}
              className="block max-h-[min(70vh,640px)] max-w-full"
            />

            {displaySize.w > 0 && (
              <>
                {isCircle ? (
                  <div
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      left: crop.x * scale,
                      top: crop.y * scale,
                      width: crop.w * scale,
                      height: crop.h * scale,
                      boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                    }}
                  />
                ) : (
                  <>
                    <div
                      className="pointer-events-none absolute bg-black/55"
                      style={{
                        left: 0,
                        top: 0,
                        width: displaySize.w,
                        height: crop.y * scale,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute bg-black/55"
                      style={{
                        left: 0,
                        top: (crop.y + crop.h) * scale,
                        width: displaySize.w,
                        height: Math.max(
                          0,
                          displaySize.h - (crop.y + crop.h) * scale,
                        ),
                      }}
                    />
                    <div
                      className="pointer-events-none absolute bg-black/55"
                      style={{
                        left: 0,
                        top: crop.y * scale,
                        width: crop.x * scale,
                        height: crop.h * scale,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute bg-black/55"
                      style={{
                        left: (crop.x + crop.w) * scale,
                        top: crop.y * scale,
                        width: Math.max(
                          0,
                          displaySize.w - (crop.x + crop.w) * scale,
                        ),
                        height: crop.h * scale,
                      }}
                    />
                  </>
                )}

                {/* Crop frame */}
                <div
                  className={`absolute cursor-move border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)] ${
                    isCircle ? "rounded-full" : ""
                  }`}
                  style={{
                    left: crop.x * scale,
                    top: crop.y * scale,
                    width: crop.w * scale,
                    height: crop.h * scale,
                  }}
                  onPointerDown={onPointerDown("move")}
                >
                  {!isCircle && (
                    <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-white/25" />
                      ))}
                    </div>
                  )}

                  {handles.map((handle) => {
                    const isCorner = handle.length === 2;
                    const position: CSSProperties = {};
                    if (handle.includes("n")) position.top = -6;
                    if (handle.includes("s")) position.bottom = -6;
                    if (handle.includes("w")) position.left = -6;
                    if (handle.includes("e")) position.right = -6;
                    if (handle === "n" || handle === "s") {
                      position.left = "50%";
                      position.transform = "translateX(-50%)";
                    }
                    if (handle === "e" || handle === "w") {
                      position.top = "50%";
                      position.transform = "translateY(-50%)";
                    }

                    const cursor =
                      handle === "n" || handle === "s"
                        ? "ns-resize"
                        : handle === "e" || handle === "w"
                          ? "ew-resize"
                          : handle === "ne" || handle === "sw"
                            ? "nesw-resize"
                            : "nwse-resize";

                    return (
                      <div
                        key={handle}
                        onPointerDown={onPointerDown(handle)}
                        className={`absolute z-10 rounded-full border-2 border-indigo-600 bg-white ${
                          isCorner ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
                        }`}
                        style={{ ...position, cursor }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Original: {imgSize.w} × {imgSize.h}px
            </p>
            <p className="font-medium text-zinc-800 dark:text-zinc-200">
              {isCircle
                ? `Circle diameter: ${Math.min(crop.w, crop.h)}px`
                : `Crop size: ${crop.w} × ${crop.h}px`}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setCrop(
                  isCircle
                    ? forceSquare(
                        centeredCrop(imgSize.w, imgSize.h, 1),
                        imgSize.w,
                        imgSize.h,
                      )
                    : centeredCrop(imgSize.w, imgSize.h, aspect),
                )
              }
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Reset selection
            </button>
            <button
              type="button"
              onClick={() => {
                if (isCircle) {
                  const side = Math.min(imgSize.w, imgSize.h);
                  setCrop(
                    clampCrop(
                      {
                        x: (imgSize.w - side) / 2,
                        y: (imgSize.h - side) / 2,
                        w: side,
                        h: side,
                      },
                      imgSize.w,
                      imgSize.h,
                    ),
                  );
                } else {
                  setCrop({ x: 0, y: 0, w: imgSize.w, h: imgSize.h });
                }
              }}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              {isCircle ? "Largest circle" : "Select full image"}
            </button>
          </div>

          <button
            type="button"
            onClick={cropImage}
            disabled={!sourceFile || isProcessing}
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isProcessing
              ? "Cropping…"
              : isCircle
                ? "Crop Circle & Download"
                : "Crop & Download"}
          </button>
        </ToolPanel>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
