"use client";

import { useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

export default function MemeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [top, setTop] = useState("TOP TEXT");
  const [bottom, setBottom] = useState("BOTTOM TEXT");

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);

  const clearInputs = () => {
    setFile(null);
    setTop("");
    setBottom("");
  };

  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const maxW = 800;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const drawText = (text: string, y: number) => {
        const size = Math.max(24, canvas.width / 12);
        ctx.font = `bold ${size}px Impact, Arial Black, sans-serif`;
        ctx.textAlign = "center";
        ctx.lineWidth = size / 12;
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#fff";
        ctx.strokeText(text.toUpperCase(), canvas.width / 2, y);
        ctx.fillText(text.toUpperCase(), canvas.width / 2, y);
      };
      drawText(top, Math.max(40, canvas.height * 0.12));
      drawText(bottom, canvas.height - 20);
    };
    img.src = url;
  }, [url, top, bottom]);

  return (
    <div className="space-y-6">
      <ToolPanel title="Image" onClear={clearInputs}>
        <ImageDropzone
          previewUrl={url}
          fileName={file?.name ?? null}
          onFileSelect={setFile}
          accept="image/*"
        />
      </ToolPanel>
      <ToolPanel title="Captions">
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={top} onChange={(e) => setTop(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          <input value={bottom} onChange={(e) => setBottom(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
        </div>
      </ToolPanel>
      {url && (
        <ToolPanel title="Preview">
          <canvas ref={canvasRef} className="max-w-full rounded-lg border border-zinc-200 dark:border-zinc-800" />
          <button
            type="button"
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
            onClick={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              const a = document.createElement("a");
              a.href = canvas.toDataURL("image/png");
              a.download = "meme.png";
              a.click();
            }}
          >
            Download PNG
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
