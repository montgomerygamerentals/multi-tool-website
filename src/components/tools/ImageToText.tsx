"use client";

import { useState } from "react";
import ImageDropzone from "@/components/tools/shared/ImageDropzone";
import ToolPanel from "@/components/ui/ToolPanel";

export default function ImageToText() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dropKey, setDropKey] = useState(0);

  const clearInputs = () => {
    setText("");
    setStatus(null);
    setBusy(false);
    setDropKey((k) => k + 1);
  };

  const runOcr = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setStatus("Loading Tesseract.js…");
    try {
      const Tesseract = await import("tesseract.js");
      setStatus("Recognizing text…");
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text" && m.progress != null) {
            setStatus(`Recognizing… ${Math.round(m.progress * 100)}%`);
          }
        },
      });
      setText(result.data.text.trim());
      setStatus("Done.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "OCR failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Image" onClear={clearInputs}>
        <ImageDropzone
          key={dropKey}
          previewUrl={null}
          fileName={null}
          onFileSelect={runOcr}
          accept="image/*"
        />
        {busy && <p className="mt-2 text-sm text-zinc-500">{status}</p>}
      </ToolPanel>
      {text && (
        <ToolPanel title="Extracted text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="button"
            className="mt-3 rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white"
            onClick={() => navigator.clipboard.writeText(text)}
          >
            Copy
          </button>
        </ToolPanel>
      )}
      {!busy && status && !text && (
        <p className="text-sm text-zinc-500">{status}</p>
      )}
    </div>
  );
}
