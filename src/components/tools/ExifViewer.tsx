"use client";

import { useState } from "react";
import exifr from "exifr";
import ToolPanel from "@/components/ui/ToolPanel";

type MetaRow = { key: string; value: string };

function flattenMeta(data: Record<string, unknown>): MetaRow[] {
  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => ({
      key,
      value:
        value instanceof Date
          ? value.toISOString()
          : typeof value === "object"
            ? JSON.stringify(value)
            : String(value),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

export default function ExifViewer() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [rows, setRows] = useState<MetaRow[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onFile = async (list: FileList | null) => {
    const file = list?.[0];
    if (!file) return;

    setError("");
    setBusy(true);
    setFileName(file.name);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const data = await exifr.parse(file, { reviveValues: true });
      if (!data) {
        setRows([]);
        setError("No EXIF / metadata found in this image.");
      } else {
        setRows(flattenMeta(data as Record<string, unknown>));
      }
    } catch {
      setRows([]);
      setError("Could not read metadata from that file.");
    } finally {
      setBusy(false);
    }
  };

  const downloadStripped = async () => {
    if (!previewUrl) return;
    setBusy(true);
    setError("");
    try {
      const img = new Image();
      img.decoding = "async";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = previewUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.92),
      );
      if (!blob) throw new Error("Could not export image");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName.replace(/\.[^.]+$/, "") + "-no-exif.jpg";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to strip metadata.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Image">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files)}
          className="mb-4 block w-full text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white dark:text-zinc-300"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mb-4 max-h-64 rounded-xl border border-zinc-200 object-contain dark:border-zinc-700"
          />
        )}
        <button
          type="button"
          onClick={downloadStripped}
          disabled={!previewUrl || busy}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {busy ? "Working…" : "Download without EXIF (JPEG)"}
        </button>
        <p className="mt-3 text-xs text-zinc-500">
          Metadata is read in your browser. Re-encoding to JPEG removes EXIF.
        </p>
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </p>
        )}
      </ToolPanel>

      <ToolPanel title="Metadata">
        {rows.length === 0 ? (
          <p className="text-sm text-zinc-500">
            {fileName ? "No fields to show." : "Upload an image to inspect metadata."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700">
                  <th className="py-2 pr-4 font-medium">Field</th>
                  <th className="py-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-zinc-100 align-top dark:border-zinc-800"
                  >
                    <td className="py-2 pr-4 font-medium text-zinc-700 dark:text-zinc-300">
                      {row.key}
                    </td>
                    <td className="max-w-xl break-words py-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ToolPanel>
    </div>
  );
}
