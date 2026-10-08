"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [crf, setCrf] = useState("28");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const clearInputs = () => {
    setFile(null);
    setCrf("18");
    setStatus(null);
    setBusy(false);
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setStatus("Loading ffmpeg.wasm…");
    try {
      const { getFFmpeg } = await import("@/lib/ffmpeg-loader");
      const { fetchFile } = await import("@ffmpeg/util");
      const ffmpeg = await getFFmpeg();
      const inputName = "input.mp4";
      setStatus("Compressing (this can take a few minutes)…");
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      await ffmpeg.exec([
        "-i",
        inputName,
        "-vcodec",
        "libx264",
        "-crf",
        crf,
        "-preset",
        "veryfast",
        "-acodec",
        "aac",
        "out.mp4",
      ]);
      const data = await ffmpeg.readFile("out.mp4");
      const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(String(data));
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (file.name.replace(/\.[^.]+$/, "") || "video") + "-compressed.mp4";
      a.click();
      URL.revokeObjectURL(url);
      setStatus(`Done. Original ${(file.size / 1e6).toFixed(1)} MB → ${(blob.size / 1e6).toFixed(1)} MB.`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Compression failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Compress video" onClear={clearInputs}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        <label className="mt-4 mb-1 block text-sm font-medium">
          Quality CRF ({crf}) — higher = smaller file
        </label>
        <input
          type="range"
          min="18"
          max="36"
          value={crf}
          onChange={(e) => setCrf(e.target.value)}
          className="w-full"
        />
        <button
          type="button"
          disabled={!file || busy}
          onClick={compress}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? "Working…" : "Compress"}
        </button>
        {status && <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{status}</p>}
      </ToolPanel>
    </div>
  );
}
