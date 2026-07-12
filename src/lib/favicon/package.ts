export const FAVICON_SIZES = [
  { size: 16, filename: "favicon-16x16.png", label: "Browser tabs" },
  { size: 32, filename: "favicon-32x32.png", label: "HiDPI tabs" },
  { size: 180, filename: "apple-touch-icon.png", label: "iPhone & iPad" },
  { size: 192, filename: "android-chrome-192x192.png", label: "Android home screen" },
  { size: 512, filename: "android-chrome-512x512.png", label: "PWA install icon" },
] as const;

/** Exact pixel sizes shown in the live preview strip */
export const LIVE_PREVIEW_SIZES = [48, 32, 24, 16] as const;

export const ICO_SIZES = [16, 32, 48] as const;

export type FaviconShape = "square" | "rounded" | "circle";

export interface TextFaviconOptions {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  backgroundColor: string;
  textColor: string;
  shape: FaviconShape;
}

export interface EmojiFaviconOptions {
  emoji: string;
  backgroundColor: string;
  transparentBackground: boolean;
}

export interface ManifestOptions {
  name: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
}

export function createWebManifest(options: ManifestOptions): string {
  return JSON.stringify(
    {
      name: options.name,
      short_name: options.shortName,
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: options.themeColor,
      background_color: options.backgroundColor,
      display: "standalone",
    },
    null,
    2,
  );
}

export function createFaviconHtml(): string {
  return `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">`;
}

const MASTER_SIZE = 1024;
/** Font sizes in the UI are tuned for a 512px canvas; scale them to the master. */
const FONT_SIZE_BASE = 512;

function drawShape(
  ctx: CanvasRenderingContext2D,
  size: number,
  shape: FaviconShape,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.beginPath();

  if (shape === "circle") {
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  } else if (shape === "rounded") {
    const r = size * 0.2;
    ctx.roundRect(0, 0, size, size, r);
  } else {
    ctx.rect(0, 0, size, size);
  }

  ctx.fill();
}

async function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<ArrayBuffer> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/png");
  });
  if (!blob) throw new Error("Failed to create PNG");
  return blob.arrayBuffer();
}

function resizeCanvasFallback(
  source: HTMLCanvasElement,
  size: number,
): HTMLCanvasElement {
  let current: HTMLCanvasElement = source;
  let width = source.width;
  let height = source.height;

  while (width / 2 >= size && height / 2 >= size) {
    width = Math.floor(width / 2);
    height = Math.floor(height / 2);
    const step = document.createElement("canvas");
    step.width = width;
    step.height = height;
    const stepCtx = step.getContext("2d");
    if (!stepCtx) throw new Error("Canvas not supported");
    stepCtx.imageSmoothingEnabled = true;
    stepCtx.imageSmoothingQuality = "high";
    stepCtx.drawImage(current, 0, 0, width, height);
    current = step;
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(current, 0, 0, size, size);
  return canvas;
}

async function resizeCanvas(
  source: HTMLCanvasElement,
  size: number,
): Promise<HTMLCanvasElement> {
  if (source.width === size && source.height === size) {
    return source;
  }

  if (typeof createImageBitmap === "function") {
    try {
      let bitmap = await createImageBitmap(source);
      let width = bitmap.width;
      let height = bitmap.height;

      while (width / 2 >= size && height / 2 >= size) {
        width = Math.floor(width / 2);
        height = Math.floor(height / 2);
        const next = await createImageBitmap(bitmap, {
          resizeWidth: width,
          resizeHeight: height,
          resizeQuality: "high",
        });
        bitmap.close();
        bitmap = next;
      }

      const final =
        width === size && height === size
          ? bitmap
          : await createImageBitmap(bitmap, {
              resizeWidth: size,
              resizeHeight: size,
              resizeQuality: "high",
            });
      if (final !== bitmap) bitmap.close();

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(final, 0, 0);
      final.close();
      return canvas;
    } catch {
      // Fall back to canvas drawImage path
    }
  }

  return resizeCanvasFallback(source, size);
}

export async function loadImageSource(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
  return img;
}

export async function renderImageToCanvas(src: string): Promise<HTMLCanvasElement> {
  const img = await loadImageSource(src);
  // Keep more detail from large uploads before we downscale to package sizes
  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  const size = Math.min(2048, Math.max(MASTER_SIZE, longest));
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const scale = Math.max(size / img.naturalWidth, size / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  ctx.drawImage(img, x, y, w, h);
  return canvas;
}

export async function renderTextToCanvas(
  options: TextFaviconOptions,
): Promise<HTMLCanvasElement> {
  const size = MASTER_SIZE;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  drawShape(ctx, size, options.shape, options.backgroundColor);

  const text = options.text.slice(0, 3).toUpperCase();
  const fontSize = Math.round(options.fontSize * (size / FONT_SIZE_BASE));
  const fontWeight = options.fontWeight || 700;

  try {
    await document.fonts.load(`${fontWeight} ${fontSize}px "${options.fontFamily}"`);
  } catch {
    // Fall back to system font if Google Font hasn't loaded yet
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = options.textColor;
  ctx.font = `${fontWeight} ${fontSize}px "${options.fontFamily}", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, size / 2, size / 2 + fontSize * 0.05);

  return canvas;
}

export async function renderEmojiToCanvas(
  options: EmojiFaviconOptions,
): Promise<HTMLCanvasElement> {
  const size = MASTER_SIZE;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  if (!options.transparentBackground) {
    drawShape(ctx, size, "square", options.backgroundColor);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.font = `${size * 0.65}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(options.emoji, size / 2, size / 2 + size * 0.03);

  return canvas;
}

function encodeIco(images: { size: number; data: ArrayBuffer }[]): ArrayBuffer {
  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const totalSize = headerSize + images.reduce((sum, img) => sum + img.data.byteLength, 0);
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);

  images.forEach((img, i) => {
    const entry = 6 + i * 16;
    const dim = img.size >= 256 ? 0 : img.size;
    bytes[entry] = dim;
    bytes[entry + 1] = dim;
    bytes[entry + 4] = 1;
    bytes[entry + 6] = 32;
    view.setUint32(entry + 8, img.data.byteLength, true);
    view.setUint32(entry + 12, offset, true);
    bytes.set(new Uint8Array(img.data), offset);
    offset += img.data.byteLength;
  });

  return buffer;
}

export interface FaviconPackageResult {
  blobs: Map<string, ArrayBuffer>;
  previewUrls: Map<string, string>;
}

export async function generateFaviconPackage(
  sourceCanvas: HTMLCanvasElement,
  manifestOptions: ManifestOptions,
): Promise<FaviconPackageResult> {
  const blobs = new Map<string, ArrayBuffer>();
  const previewUrls = new Map<string, string>();

  for (const { size, filename } of FAVICON_SIZES) {
    const resized = await resizeCanvas(sourceCanvas, size);
    const data = await canvasToPngBlob(resized);
    blobs.set(filename, data);
    previewUrls.set(filename, URL.createObjectURL(new Blob([data], { type: "image/png" })));
  }

  // Crisp 1:1 previews for the live strip (including sizes not in the ZIP)
  for (const size of LIVE_PREVIEW_SIZES) {
    const key = `live-${size}.png`;
    const fromPackage = FAVICON_SIZES.find((entry) => entry.size === size);
    if (fromPackage) {
      const existing = previewUrls.get(fromPackage.filename);
      if (existing) {
        previewUrls.set(key, existing);
        continue;
      }
    }
    const resized = await resizeCanvas(sourceCanvas, size);
    const data = await canvasToPngBlob(resized);
    previewUrls.set(key, URL.createObjectURL(new Blob([data], { type: "image/png" })));
  }

  const icoImages = await Promise.all(
    ICO_SIZES.map(async (size) => ({
      size,
      data: await canvasToPngBlob(await resizeCanvas(sourceCanvas, size)),
    })),
  );
  blobs.set("favicon.ico", encodeIco(icoImages));

  blobs.set("site.webmanifest", new TextEncoder().encode(createWebManifest(manifestOptions)).buffer);

  return { blobs, previewUrls };
}

export async function downloadFaviconZip(
  blobs: Map<string, ArrayBuffer>,
  filename = "favicon-package.zip",
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  blobs.forEach((data, name) => {
    zip.file(name, data);
  });

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function revokePreviewUrls(urls: Map<string, string>) {
  urls.forEach((url) => URL.revokeObjectURL(url));
}
