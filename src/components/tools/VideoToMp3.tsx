"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function VideoToMp3() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const clearInputs = () => {
    setFile(null);
    setStatus(null);
    setBusy(false);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setStatus("Loading ffmpeg.wasm…");
    try {
      const { getFFmpeg } = await import("@/lib/ffmpeg-loader");
      const { fetchFile } = await import("@ffmpeg/util");
      const ffmpeg = await getFFmpeg();
      const inputName = "input" + (file.name.match(/\.[^.]+$/)?.[0] ?? ".mp4");
      setStatus("Extracting audio…");
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      await ffmpeg.exec(["-i", inputName, "-vn", "-acodec", "libmp3lame", "-q:a", "2", "out.mp3"]);
      const data = await ffmpeg.readFile("out.mp3");
      const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(String(data));
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (file.name.replace(/\.[^.]+$/, "") || "audio") + ".mp3";
      a.click();
      URL.revokeObjectURL(url);
      setStatus("Done — download started.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Video file" onClear={clearInputs}>
        <input
          type="file"
          accept="video/*,audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        <button
          type="button"
          disabled={!file || busy}
          onClick={convert}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? "Working…" : "Convert to MP3"}
        </button>
        {status && <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{status}</p>}
        <p className="mt-2 text-xs text-zinc-500">
          Runs entirely in your browser via ffmpeg.wasm. Large files may take a while and need memory.
        </p>
      </ToolPanel>
    </div>
  );
}
