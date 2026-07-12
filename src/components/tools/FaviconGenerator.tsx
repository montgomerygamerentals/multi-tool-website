"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import HexColorPicker from "@/components/tools/shared/HexColorPicker";
import ToolPanel from "@/components/ui/ToolPanel";
import {
  createFaviconHtml,
  downloadFaviconZip,
  generateFaviconPackage,
  LIVE_PREVIEW_SIZES,
  renderEmojiToCanvas,
  renderImageToCanvas,
  renderTextToCanvas,
  revokePreviewUrls,
  type FaviconShape,
  type FaviconPackageResult,
} from "@/lib/favicon/package";

type GeneratorMode = "image" | "text" | "emoji";

const FONT_OPTIONS = [
  "Abril Fatface",
  "Alegreya",
  "Anton",
  "Archivo Black",
  "Arvo",
  "Bangers",
  "Bebas Neue",
  "Bitter",
  "Cabin",
  "Cairo",
  "Caveat",
  "Comfortaa",
  "Comic Neue",
  "Cormorant Garamond",
  "Courier Prime",
  "Crimson Text",
  "DM Sans",
  "Dancing Script",
  "Domine",
  "Dosis",
  "Exo 2",
  "Fira Sans",
  "Fjalla One",
  "Fredoka",
  "IBM Plex Mono",
  "IBM Plex Sans",
  "Inconsolata",
  "Indie Flower",
  "Inter",
  "Josefin Sans",
  "Kanit",
  "Karla",
  "Lato",
  "Leckerli One",
  "Libre Baskerville",
  "Libre Franklin",
  "Lobster",
  "Lora",
  "Manrope",
  "Merriweather",
  "Montserrat",
  "Mukta",
  "Mulish",
  "Nunito",
  "Nunito Sans",
  "Open Sans",
  "Oswald",
  "Outfit",
  "Overpass",
  "Oxygen",
  "PT Sans",
  "PT Serif",
  "Pacifico",
  "Passion One",
  "Permanent Marker",
  "Playfair Display",
  "Poppins",
  "Press Start 2P",
  "Prompt",
  "Quicksand",
  "Raleway",
  "Roboto",
  "Roboto Condensed",
  "Roboto Mono",
  "Roboto Slab",
  "Righteous",
  "Rubik",
  "Satisfy",
  "Shadows Into Light",
  "Signika",
  "Sora",
  "Source Code Pro",
  "Source Sans 3",
  "Source Serif 4",
  "Space Grotesk",
  "Space Mono",
  "Spectral",
  "Teko",
  "Titillium Web",
  "Ubuntu",
  "Vollkorn",
  "Work Sans",
  "Yanone Kaffeesatz",
  "Zilla Slab",
];

const FONT_VARIANTS = [
  { label: "Regular 400 Normal", weight: 400 },
  { label: "Medium 500 Normal", weight: 500 },
  { label: "Semi Bold 600 Normal", weight: 600 },
  { label: "Bold 700 Normal", weight: 700 },
] as const;

const fieldClass =
  "w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800";
const labelClass = "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const POPULAR_EMOJIS = [
  "🚀", "🔥", "⭐", "💡", "🎯", "🎨", "🎮", "🎵", "📱", "💻",
  "🌐", "📦", "🏠", "❤️", "✅", "⚡", "🌟", "🍕", "☕", "🎉",
  "🐱", "🐶", "🦊", "🌈", "🌙", "☀️", "🍀", "🎁", "📚", "✨",
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
  const [fontWeight, setFontWeight] = useState(700);
  const [backgroundColor, setBackgroundColor] = useState("#209cee");
  const [textColor, setTextColor] = useState("#ffffff");
  const [shape, setShape] = useState<FaviconShape>("rounded");

  // Emoji mode
  const [emoji, setEmoji] = useState("🚀");
  const [emojiBg, setEmojiBg] = useState("#ffffff");
  const [transparentBg, setTransparentBg] = useState(false);

  // Output
  const [packageResult, setPackageResult] = useState<FaviconPackageResult | null>(null);
  const packageResultRef = useRef<FaviconPackageResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalIconsRef = useRef<
    { rel: string; href: string; type: string; sizes: string }[] | null
  >(null);

  useEffect(() => {
    if (mode !== "text") return;

    const linkId = "favicon-generator-font";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily).replace(/%20/g, "+")}:wght@400;500;600;700&display=swap`;
  }, [mode, fontFamily]);

  useEffect(() => {
    return () => {
      document.getElementById("favicon-generator-font")?.remove();
    };
  }, []);

  // Capture the site's real favicons once, so we can restore them on leave
  useEffect(() => {
    if (originalIconsRef.current) return;
    originalIconsRef.current = Array.from(
      document.querySelectorAll<HTMLLinkElement>(
        'link[rel="icon"], link[rel="shortcut icon"]',
      ),
    ).map((el) => ({
      rel: el.getAttribute("rel") || "icon",
      href: el.href,
      type: el.getAttribute("type") || "",
      sizes: el.getAttribute("sizes") || "",
    }));
  }, []);

  // Mirror the generated favicon in the browser tab while working
  useEffect(() => {
    const href =
      packageResult?.previewUrls.get("favicon-32x32.png") ??
      packageResult?.previewUrls.get("favicon-16x16.png") ??
      null;
    if (!href) return;

    let live = document.getElementById(
      "favicon-live-preview",
    ) as HTMLLinkElement | null;

    if (!live) {
      document
        .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
        .forEach((el) => el.remove());
      live = document.createElement("link");
      live.id = "favicon-live-preview";
      live.rel = "icon";
      live.type = "image/png";
      document.head.appendChild(live);
    }

    live.href = href;
  }, [packageResult]);

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
          fontWeight,
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

      const accent =
        mode === "text"
          ? backgroundColor
          : mode === "emoji" && !transparentBg
            ? emojiBg
            : "#ffffff";

      const result = await generateFaviconPackage(sourceCanvas, {
        name: "",
        shortName: "",
        themeColor: accent,
        backgroundColor: accent,
      });

      const previous = packageResultRef.current;
      packageResultRef.current = result;
      setPackageResult(result);
      if (previous) revokePreviewUrls(previous.previewUrls);

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
    fontWeight,
    backgroundColor,
    textColor,
    shape,
    emoji,
    emojiBg,
    transparentBg,
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
    fontWeight,
    backgroundColor,
    textColor,
    shape,
    emoji,
    emojiBg,
    transparentBg,
  ]);

  useEffect(() => {
    return () => {
      if (packageResultRef.current) revokePreviewUrls(packageResultRef.current.previewUrls);
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);

      document.getElementById("favicon-live-preview")?.remove();
      document
        .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
        .forEach((el) => el.remove());

      for (const orig of originalIconsRef.current ?? []) {
        const link = document.createElement("link");
        link.rel = orig.rel;
        link.href = orig.href;
        if (orig.type) link.type = orig.type;
        if (orig.sizes) link.setAttribute("sizes", orig.sizes);
        document.head.appendChild(link);
      }
    };
  }, []);

  const handleDownload = async () => {
    const result = packageResult ?? (await buildPackage());
    if (!result) return;
    await downloadFaviconZip(result.blobs, "favicon-package.zip");
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
        <ImageDropzone
          previewUrl={previewUrl}
          fileName={sourceFile?.name ?? null}
          onFileSelect={handleFileSelect}
          accept="image/*,.svg"
          hint="PNG, JPG, SVG, WebP, and more"
        />
      )}

      {mode === "text" && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Text</label>
                <input
                  type="text"
                  value={text}
                  maxLength={3}
                  onChange={(e) => setText(e.target.value)}
                  className={`${fieldClass} text-lg font-semibold`}
                />
              </div>
              <div>
                <label className={labelClass}>Background</label>
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value as FaviconShape)}
                  className={fieldClass}
                >
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className={fieldClass}
                  style={{ fontFamily: `"${fontFamily}", sans-serif` }}
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f} style={{ fontFamily: `"${f}", sans-serif` }}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Font Variant</label>
                <select
                  value={fontWeight}
                  onChange={(e) => setFontWeight(Number(e.target.value))}
                  className={fieldClass}
                >
                  {FONT_VARIANTS.map((variant) => (
                    <option key={variant.weight} value={variant.weight}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Font Size</label>
                <input
                  type="number"
                  min={120}
                  max={400}
                  value={fontSize}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    if (Number.isNaN(next)) return;
                    setFontSize(Math.min(400, Math.max(120, next)));
                  }}
                  className={fieldClass}
                />
              </div>
            </div>

            <HexColorPicker
              label="Font Color"
              value={textColor}
              onChange={setTextColor}
            />
            <HexColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={setBackgroundColor}
            />
          </div>
        </div>
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

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {packageResult && (
        <>
          <ToolPanel title="Live preview">
            <div className="flex flex-wrap items-end gap-6">
              {LIVE_PREVIEW_SIZES.map((size) => {
                const src = packageResult.previewUrls.get(`live-${size}.png`);
                return (
                  <div key={size} className="flex flex-col items-center gap-2">
                    {src ? (
                      <img
                        src={src}
                        alt={`${size}×${size} preview`}
                        width={size}
                        height={size}
                        className="block"
                        style={{ width: size, height: size }}
                      />
                    ) : (
                      <div
                        className="rounded bg-zinc-200 dark:bg-zinc-700"
                        style={{ width: size, height: size }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              These sizes mirror the files generated in your ZIP download.
            </p>
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
