"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import ToolPanel from "@/components/ui/ToolPanel";

const MIN_SIZE = 128;
const MAX_SIZE = 2500;

function clampSize(value: number) {
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, value));
}

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [sizeInput, setSizeInput] = useState("256");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [transparentBg, setTransparentBg] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const commitSize = useCallback((raw: string) => {
    const parsed = Number(raw);
    const next = Number.isFinite(parsed) ? clampSize(parsed) : MIN_SIZE;
    setSize(next);
    setSizeInput(String(next));
  }, []);

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
        color: {
          dark: fgColor,
          light: transparentBg ? "#00000000" : bgColor,
        },
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
  }, [text, size, fgColor, bgColor, transparentBg]);

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
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">
            Size (px){" "}
            <span className="font-normal text-zinc-500">· max {MAX_SIZE}</span>
          </label>
          <input
            type="number"
            value={sizeInput}
            min={MIN_SIZE}
            max={MAX_SIZE}
            step={64}
            onChange={(e) => {
              const raw = e.target.value;
              setSizeInput(raw);
              const parsed = Number(raw);
              if (
                raw !== "" &&
                Number.isFinite(parsed) &&
                parsed >= MIN_SIZE &&
                parsed <= MAX_SIZE
              ) {
                setSize(parsed);
              }
            }}
            onBlur={() => commitSize(sizeInput)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 sm:max-w-xs"
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
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
              disabled={transparentBg}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg disabled:opacity-50"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setTransparentBg((v) => !v)}
          aria-pressed={transparentBg}
          className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
            transparentBg
              ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/40"
              : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          }`}
        >
          <span
            className="h-8 w-8 shrink-0 rounded border border-zinc-300 dark:border-zinc-600"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
              backgroundColor: "#fff",
            }}
            aria-hidden
          />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Transparent background</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              Export PNG with no fill behind the code
            </span>
          </span>
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
              transparentBg
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-zinc-400 dark:border-zinc-500"
            }`}
            aria-hidden
          >
            {transparentBg && (
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 6l3 3 5-5" />
              </svg>
            )}
          </span>
        </button>
      </ToolPanel>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {dataUrl && (
        <div className="flex flex-col items-center gap-4">
          <canvas ref={canvasRef} className="hidden" />
          <div
            className="rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-700"
            style={
              transparentBg
                ? {
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
                    backgroundColor: "#fff",
                  }
                : undefined
            }
          >
            <img
              src={dataUrl}
              alt="Generated QR code"
              width={size}
              height={size}
              className="block rounded-lg"
            />
          </div>
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
