"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";
import {
  createFaviconHtml,
  downloadFaviconZip,
  FAVICON_SIZES,
  generateFaviconPackage,
  renderEmojiToCanvas,
  renderImageToCanvas,
  renderTextToCanvas,
  revokePreviewUrls,
  type FaviconShape,
  type FaviconPackageResult,
} from "@/lib/favicon/package";

type GeneratorMode = "image" | "text" | "emoji";

const FONT_OPTIONS = [
  "Roboto",
  "Montserrat",
  "Open Sans",
  "Poppins",
  "Lato",
  "Oswald",
  "Raleway",
  "Playfair Display",
  "Merriweather",
  "Inter",
];

const POPULAR_EMOJIS = [
  "🚀", "🔥", "⭐", "💡", "🎯", "🎨", "🎮", "🎵", "📱", "💻",
  "🌐", "📦", "🏠", "❤️", "✅", "⚡", "🌟", "🍕", "☕", "🎉",
  "🐱", "🐶", "🦊", "🌈", "🌙", "☀️", "🍀", "🎁", "📚", "✨",
];

const PACKAGE_FILES = [
  { file: "favicon.ico", desc: "Legacy browser fallback" },
  ...FAVICON_SIZES.map(({ filename, size, label }) => ({
    file: filename,
    desc: `${size}×${size} — ${label}`,
  })),
  { file: "site.webmanifest", desc: "PWA install metadata" },
];

export default function FaviconGenerator() {
  const [mode, setMode] = useState<GeneratorMode>("image");

  // Image mode
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  // Text mode
  const [text, setText] = useState("A");
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [fontSize, setFontSize] = useState(280);
  const [backgroundColor, setBackgroundColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [shape, setShape] = useState<FaviconShape>("rounded");

  // Emoji mode
  const [emoji, setEmoji] = useState("🚀");
  const [emojiBg, setEmojiBg] = useState("#ffffff");
  const [transparentBg, setTransparentBg] = useState(false);

  // Manifest / site settings
  const [siteName, setSiteName] = useState("My Website");
  const [shortName, setShortName] = useState("My Site");
  const [themeColor, setThemeColor] = useState("#ffffff");
  const [manifestBg, setManifestBg] = useState("#ffffff");

  // Output
  const [packageResult, setPackageResult] = useState<FaviconPackageResult | null>(null);
  const packageResultRef = useRef<FaviconPackageResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${FONT_OPTIONS.map((f) => `family=${f.replace(/ /g, "+")}:wght@700`).join("&")}&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleFileSelect = useCallback((file: File | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    setError(null);

    if (!file) {
      setSourceFile(null);
      setPreviewUrl(null);
      previewRef.current = null;
      return;
    }

    const isSvg = file.type === "image/svg+xml" || file.name.endsWith(".svg");
    if (!file.type.startsWith("image/") && !isSvg) {
      setError("Please select a valid image or SVG file.");
      return;
    }

    const url = URL.createObjectURL(file);
    previewRef.current = url;
    setSourceFile(file);
    setPreviewUrl(url);
  }, []);

  const buildPackage = useCallback(async (): Promise<FaviconPackageResult | null> => {
    setIsProcessing(true);
    setError(null);

    if (packageResultRef.current) {
      revokePreviewUrls(packageResultRef.current.previewUrls);
      packageResultRef.current = null;
      setPackageResult(null);
    }

    try {
      let sourceCanvas: HTMLCanvasElement;

      if (mode === "image") {
        if (!previewUrl) {
          setError("Please upload an image first.");
          return null;
        }
        sourceCanvas = await renderImageToCanvas(previewUrl);
      } else if (mode === "text") {
        if (!text.trim()) {
          setError("Please enter at least one character.");
          return null;
        }
        sourceCanvas = await renderTextToCanvas({
          text,
          fontFamily,
          fontSize,
          backgroundColor,
          textColor,
          shape,
        });
      } else {
        if (!emoji.trim()) {
          setError("Please enter at least one character.");
          return null;
        }
        sourceCanvas = await renderEmojiToCanvas({
          emoji,
          backgroundColor: emojiBg,
          transparentBackground: transparentBg,
        });
      }

      const result = await generateFaviconPackage(sourceCanvas, {
        name: siteName,
        shortName,
        themeColor,
        backgroundColor: manifestBg,
      });
      packageResultRef.current = result;
      setPackageResult(result);
      return result;
    } catch {
      setError("Failed to generate favicon package. Please try again.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [
    mode,
    previewUrl,
    text,
    fontFamily,
    fontSize,
    backgroundColor,
    textColor,
    shape,
    emoji,
    emojiBg,
    transparentBg,
    siteName,
    shortName,
    themeColor,
    manifestBg,
  ]);

  // Auto-preview for text/emoji modes
  useEffect(() => {
    if (mode === "image" && !previewUrl) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      buildPackage();
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mode,
    previewUrl,
    text,
    fontFamily,
    fontSize,
    backgroundColor,
    textColor,
    shape,
    emoji,
    emojiBg,
    transparentBg,
    siteName,
    shortName,
    themeColor,
    manifestBg,
  ]);

  useEffect(() => {
    return () => {
      if (packageResultRef.current) revokePreviewUrls(packageResultRef.current.previewUrls);
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const handleDownload = async () => {
    const result = packageResult ?? (await buildPackage());
    if (!result) return;
    const baseName = siteName.toLowerCase().replace(/\s+/g, "-") || "favicon";
    await downloadFaviconZip(result.blobs, `${baseName}-favicon-package.zip`);
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(createFaviconHtml());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const tabs: { id: GeneratorMode; label: string; desc: string }[] = [
    { id: "image", label: "Image", desc: "Upload a logo or PNG/JPG/SVG" },
    { id: "text", label: "Text", desc: "Letters, initials, or short text" },
    { id: "emoji", label: "Emoji", desc: "Pick a recognizable symbol" },
  ];

  return (
    <div className="space-y-8">
      {/* Mode tabs */}
      <div className="grid gap-3 sm:grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`rounded-xl border p-4 text-left transition-all ${
              mode === tab.id
                ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20 dark:border-indigo-600 dark:bg-indigo-950/30"
                : "border-zinc-200 bg-white hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900"
            }`}
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{tab.label}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{tab.desc}</p>
          </button>
        ))}
      </div>

      {/* Mode-specific inputs */}
      {mode === "image" && (
        <div className="space-y-4">
          <ImageDropzone
            previewUrl={previewUrl}
            fileName={sourceFile?.name ?? null}
            onFileSelect={handleFileSelect}
            accept="image/*,.svg"
            hint="PNG, JPG, SVG, WebP, and more"
          />
          {previewUrl && (
            <button
              type="button"
              onClick={buildPackage}
              disabled={isProcessing}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {isProcessing ? "Generating…" : "Generate favicon package"}
            </button>
          )}
        </div>
      )}

      {mode === "text" && (
        <ToolPanel title="Text favicon settings">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Text (max 3 chars)</label>
              <input
                type="text"
                value={text}
                maxLength={3}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-2xl font-bold uppercase dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Font</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Background</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Text color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Font size: {fontSize}px</label>
            <input
              type="range"
              min={120}
              max={400}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Shape</label>
            <div className="flex gap-2">
              {(["square", "rounded", "circle"] as FaviconShape[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShape(s)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                    shape === s
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </ToolPanel>
      )}

      {mode === "emoji" && (
        <ToolPanel title="Emoji favicon settings">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Selected emoji</label>
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-24 rounded-lg border border-zinc-300 px-3 py-2 text-4xl text-center dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {POPULAR_EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`flex h-11 w-11 items-center justify-center rounded-lg text-2xl transition-colors ${
                  emoji === e
                    ? "bg-indigo-100 ring-2 ring-indigo-500 dark:bg-indigo-950"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Background color</label>
              <input
                type="color"
                value={emojiBg}
                disabled={transparentBg}
                onChange={(e) => setEmojiBg(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg disabled:opacity-50"
              />
            </div>
            <label className="flex items-end gap-2 pb-2 text-sm">
              <input
                type="checkbox"
                checked={transparentBg}
                onChange={(e) => setTransparentBg(e.target.checked)}
                className="accent-indigo-600"
              />
              Transparent background
            </label>
          </div>
        </ToolPanel>
      )}

      {/* Site / manifest settings */}
      <ToolPanel title="Site settings (for web manifest)">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Site name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Short name</label>
            <input
              type="text"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Theme color</label>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Background color</label>
            <input
              type="color"
              value={manifestBg}
              onChange={(e) => setManifestBg(e.target.value)}
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

      {/* Package preview */}
      {packageResult && (
        <>
          <ToolPanel title="Complete favicon package preview">
            <p className="mb-4 text-sm text-zinc-500">
              One download includes every file modern browsers and devices expect — just like{" "}
              <a
                href="https://favicon.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                favicon.io
              </a>
              .
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PACKAGE_FILES.map(({ file, desc }) => {
                const preview = packageResult.previewUrls.get(file);
                return (
                  <div
                    key={file}
                    className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt={file}
                        className="h-12 w-12 shrink-0 rounded border border-zinc-200 object-contain dark:border-zinc-600"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-zinc-200 bg-zinc-100 text-xs font-mono dark:border-zinc-600 dark:bg-zinc-800">
                        ICO
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm font-medium">{file}</p>
                      <p className="text-xs text-zinc-500">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ToolPanel>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isProcessing}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Download ZIP package
            </button>
            <button
              type="button"
              onClick={buildPackage}
              disabled={isProcessing}
              className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Regenerate
            </button>
          </div>

          <ToolPanel title="HTML code — paste into your &lt;head&gt;">
            <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-800">
              {createFaviconHtml()}
            </pre>
            <button
              type="button"
              onClick={copyHtml}
              className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {copiedHtml ? "Copied!" : "Copy HTML"}
            </button>
          </ToolPanel>
        </>
      )}

      <p className="text-center text-xs text-zinc-500">
        All favicons are generated locally in your browser. Nothing is uploaded to any server.
      </p>
    </div>
  );
}
