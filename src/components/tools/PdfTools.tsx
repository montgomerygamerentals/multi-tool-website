"use client";

import { useCallback, useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPanel from "@/components/ui/ToolPanel";

type Mode = "merge" | "split" | "images";

function downloadBytes(bytes: Uint8Array, filename: string) {
  const copy = new Uint8Array(bytes);
  const blob = new Blob([copy], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function embedImage(doc: PDFDocument, file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const name = file.name.toLowerCase();
  if (file.type === "image/png" || name.endsWith(".png")) {
    return doc.embedPng(bytes);
  }
  if (
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg")
  ) {
    return doc.embedJpg(bytes);
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error(`Could not load ${file.name}`));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(img, 0, 0);
    const pngBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!pngBlob) throw new Error(`Could not convert ${file.name}`);
    return doc.embedPng(new Uint8Array(await pngBlob.arrayBuffer()));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function PdfTools() {
  const [mode, setMode] = useState<Mode>("merge");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [splitPage, setSplitPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const accept = mode === "images" ? "image/png,image/jpeg,image/jpg,image/webp" : "application/pdf";

  const onFiles = useCallback(
    async (list: FileList | null) => {
      if (!list?.length) return;
      const selected = Array.from(list);
      setError("");

      if (mode === "split") {
        const file = selected[0];
        setFiles([file]);
        try {
          const bytes = await file.arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const count = doc.getPageCount();
          setPageCount(count);
          setSplitPage(1);
        } catch {
          setError("Could not read that PDF.");
          setPageCount(0);
        }
        return;
      }

      setFiles((prev) => [...prev, ...selected]);
      setPageCount(0);
    },
    [mode],
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError("");
  };

  const clearFiles = () => {
    setFiles([]);
    setPageCount(0);
    setError("");
  };

  const modes = useMemo(
    () =>
      [
        { id: "merge" as const, label: "Merge PDFs" },
        { id: "split" as const, label: "Split PDF" },
        { id: "images" as const, label: "Images → PDF" },
      ] as const,
    [],
  );

  const run = async () => {
    setError("");
    setBusy(true);
    try {
      if (mode === "merge") {
        if (files.length < 2) throw new Error("Add at least two PDF files to merge.");
        const merged = await PDFDocument.create();
        for (const file of files) {
          const src = await PDFDocument.load(await file.arrayBuffer());
          const pages = await merged.copyPages(src, src.getPageIndices());
          pages.forEach((page) => merged.addPage(page));
        }
        downloadBytes(await merged.save(), "merged.pdf");
      } else if (mode === "split") {
        if (!files[0]) throw new Error("Choose a PDF to split.");
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        const count = src.getPageCount();
        if (splitPage < 1 || splitPage > count) {
          throw new Error(`Page must be between 1 and ${count}.`);
        }
        const out = await PDFDocument.create();
        const [page] = await out.copyPages(src, [splitPage - 1]);
        out.addPage(page);
        downloadBytes(await out.save(), `page-${splitPage}.pdf`);
      } else {
        if (!files.length) throw new Error("Add one or more images.");
        const doc = await PDFDocument.create();
        for (const file of files) {
          const image = await embedImage(doc, file);
          const page = doc.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        }
        downloadBytes(await doc.save(), "images.pdf");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const splitAll = async () => {
    setError("");
    setBusy(true);
    try {
      if (!files[0]) throw new Error("Choose a PDF to split.");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const count = src.getPageCount();
      for (let i = 0; i < count; i++) {
        const out = await PDFDocument.create();
        const [page] = await out.copyPages(src, [i]);
        out.addPage(page);
        downloadBytes(await out.save(), `page-${i + 1}.pdf`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setMode(item.id);
              setFiles([]);
              setError("");
              setPageCount(0);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === item.id
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ToolPanel title="Files">
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {mode === "merge"
              ? files.length === 0
                ? "Add PDFs to merge"
                : "Add another PDF"
              : mode === "images"
                ? files.length === 0
                  ? "Add images"
                  : "Add more images"
                : "Choose a PDF"}
          </span>
          <input
            type="file"
            accept={accept}
            multiple={mode !== "split"}
            onChange={(e) => {
              onFiles(e.target.files);
              e.target.value = "";
            }}
            className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white dark:text-zinc-300"
          />
        </label>

        {files.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
                >
                  <span className="min-w-0 truncate text-zinc-700 dark:text-zinc-300">
                    {mode !== "split" && (
                      <span className="mr-2 text-zinc-400">{index + 1}.</span>
                    )}
                    {file.name}
                  </span>
                  {mode !== "split" && (
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="shrink-0 text-xs font-medium text-zinc-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {mode !== "split" && (
              <button
                type="button"
                onClick={clearFiles}
                className="mt-2 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {mode === "split" && pageCount > 0 && (
          <label className="mb-4 block text-sm">
            <span className="mb-1 block font-medium">Extract page (1–{pageCount})</span>
            <input
              type="number"
              min={1}
              max={pageCount}
              value={splitPage}
              onChange={(e) => setSplitPage(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </label>
        )}

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={run}
            disabled={busy || files.length === 0}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {busy
              ? "Working…"
              : mode === "merge"
                ? "Merge & Download"
                : mode === "split"
                  ? "Extract Page"
                  : "Create PDF"}
          </button>
          {mode === "split" && pageCount > 1 && (
            <button
              type="button"
              onClick={splitAll}
              disabled={busy || files.length === 0}
              className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Download every page
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Files stay in your browser — nothing is uploaded.
        </p>
      </ToolPanel>
    </div>
  );
}
