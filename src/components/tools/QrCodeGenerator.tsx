"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import ToolPanel from "@/components/ui/ToolPanel";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!text.trim()) {
      setError("Please enter text or a URL.");
      setDataUrl(null);
      return;
    }
    setError(null);

    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
      });
      setDataUrl(url);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvasRef.current!.width = size;
          canvasRef.current!.height = size;
          ctx?.drawImage(img, 0, 0);
        };
        img.src = url;
      }
    } catch {
      setError("Failed to generate QR code. Text may be too long.");
      setDataUrl(null);
    }
  }, [text, size, fgColor, bgColor]);

  useEffect(() => {
    generate();
  }, [generate]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Content">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Enter a URL, text, or WiFi string…"
          className="mb-4 w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Size (px)</label>
            <input
              type="number"
              value={size}
              min={128}
              max={1024}
              step={64}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Foreground</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Background</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg"
            />
          </div>
        </div>
      </ToolPanel>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {dataUrl && (
        <div className="flex flex-col items-center gap-4">
          <canvas ref={canvasRef} className="hidden" />
          <img
            src={dataUrl}
            alt="Generated QR code"
            className="rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-700"
            width={size}
            height={size}
          />
          <button
            type="button"
            onClick={download}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
