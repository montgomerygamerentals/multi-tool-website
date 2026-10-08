"use client";

import { useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function writeWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const samples = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = samples * blockAlign;
  const array = new ArrayBuffer(44 + dataSize);
  const view = new DataView(array);
  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);
  let offset = 44;
  const channels = Array.from({ length: numChannels }, (_, c) => buffer.getChannelData(c));
  for (let i = 0; i < samples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const s = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
  }
  return new Blob([array], { type: "audio/wav" });
}

export default function AudioCutter() {
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [fade, setFade] = useState(0.25);
  const [status, setStatus] = useState<string | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  const loadFile = async (f: File | null) => {
    setFile(f);
    bufferRef.current = null;
    if (!f) return;
    const ctx = new AudioContext();
    const arr = await f.arrayBuffer();
    const buf = await ctx.decodeAudioData(arr.slice(0));
    bufferRef.current = buf;
    setDuration(buf.duration);
    setStart(0);
    setEnd(Math.min(buf.duration, 30));
    await ctx.close();
  };

  const clearInputs = () => {
    void loadFile(null);
    setStart(0);
    setEnd(0);
    setFade(0);
    setStatus(null);
  };

  const exportClip = async () => {
    const src = bufferRef.current;
    if (!src) return;
    const s0 = Math.max(0, Math.min(start, src.duration));
    const s1 = Math.max(s0, Math.min(end, src.duration));
    const length = Math.floor((s1 - s0) * src.sampleRate);
    if (length <= 0) {
      setStatus("Invalid trim range.");
      return;
    }
    const offline = new OfflineAudioContext(
      src.numberOfChannels,
      length,
      src.sampleRate,
    );
    const node = offline.createBufferSource();
    node.buffer = src;
    const gain = offline.createGain();
    const fadeSec = Math.min(fade, (s1 - s0) / 2);
    gain.gain.setValueAtTime(0, 0);
    gain.gain.linearRampToValueAtTime(1, fadeSec);
    gain.gain.setValueAtTime(1, Math.max(fadeSec, s1 - s0 - fadeSec));
    gain.gain.linearRampToValueAtTime(0, s1 - s0);
    node.connect(gain);
    gain.connect(offline.destination);
    node.start(0, s0, s1 - s0);
    const rendered = await offline.startRendering();
    const blob = writeWav(rendered);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ringtone-clip.wav";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded WAV clip.");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Trim & fade" onClear={clearInputs}>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => loadFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        {file && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Start (s)</label>
              <input
                type="number"
                min={0}
                max={duration}
                step={0.01}
                value={start}
                onChange={(e) => setStart(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End (s)</label>
              <input
                type="number"
                min={0}
                max={duration}
                step={0.01}
                value={end}
                onChange={(e) => setEnd(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Fade (s)</label>
              <input
                type="number"
                min={0}
                step={0.05}
                value={fade}
                onChange={(e) => setFade(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>
        )}
        <button
          type="button"
          disabled={!file}
          onClick={exportClip}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Download WAV
        </button>
        {status && <p className="mt-2 text-sm text-zinc-600">{status}</p>}
      </ToolPanel>
    </div>
  );
}
