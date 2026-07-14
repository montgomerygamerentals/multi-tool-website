"use client";

import { useCallback, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";
import { md5 } from "@/lib/md5";

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const ALGORITHMS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashBuffer(algorithm: Algorithm, data: ArrayBuffer): Promise<string> {
  if (algorithm === "MD5") return md5(data);
  const digest = await crypto.subtle.digest(algorithm, data);
  return toHex(digest);
}

export default function HashGenerator() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [hash, setHash] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const onFile = async (list: FileList | null) => {
    const file = list?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileBuffer(await file.arrayBuffer());
    setHash("");
  };

  const run = useCallback(async () => {
    setBusy(true);
    setCopied(false);
    try {
      if (mode === "text") {
        const data = new TextEncoder().encode(text).buffer;
        setHash(await hashBuffer(algorithm, data));
      } else if (fileBuffer) {
        setHash(await hashBuffer(algorithm, fileBuffer));
      } else {
        setHash("");
      }
    } finally {
      setBusy(false);
    }
  }, [algorithm, fileBuffer, mode, text]);

  const copy = async () => {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Input">
        <div className="mb-4 flex gap-2">
          {(["text", "file"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setMode(id);
                setHash("");
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                mode === id
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {id}
            </button>
          ))}
        </div>

        {mode === "text" ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Enter text to hash…"
            className="mb-4 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        ) : (
          <div className="mb-4">
            <input
              type="file"
              onChange={(e) => onFile(e.target.files)}
              className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white dark:text-zinc-300"
            />
            {fileName && (
              <p className="mt-2 text-sm text-zinc-500">Selected: {fileName}</p>
            )}
          </div>
        )}

        <label className="mb-4 block text-sm">
          <span className="mb-1 block font-medium">Algorithm</span>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {ALGORITHMS.map((alg) => (
              <option key={alg} value={alg}>
                {alg}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={run}
          disabled={busy || (mode === "text" ? false : !fileBuffer)}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {busy ? "Hashing…" : "Generate Hash"}
        </button>
      </ToolPanel>

      <ToolPanel title="Result">
        <div className="flex items-start gap-3">
          <code className="min-h-[3rem] flex-1 break-all rounded-lg bg-zinc-100 px-4 py-3 font-mono text-sm dark:bg-zinc-800">
            {hash || "—"}
          </code>
          <button
            type="button"
            onClick={copy}
            disabled={!hash}
            className="shrink-0 rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </ToolPanel>
    </div>
  );
}
