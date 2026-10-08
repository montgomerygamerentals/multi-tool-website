"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function base64UrlDecode(segment: string): string {
  let b64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => {
    const trimmed = token.trim();
    if (!trimmed) return null;
    const parts = trimmed.split(".");
    if (parts.length < 2) return { error: "JWT must have at least header and payload." };
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]!));
      const payload = JSON.parse(base64UrlDecode(parts[1]!));
      return { header, payload, signature: parts[2] ?? "" };
    } catch {
      return { error: "Could not decode JWT segments (invalid Base64URL or JSON)." };
    }
  }, [token]);

  const clearInputs = () => setToken("");

  return (
    <div className="space-y-6">
      <ToolPanel title="Token" onClear={clearInputs}>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="Paste JWT (eyJhbGciOi…)"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </ToolPanel>
      <p className="text-xs text-zinc-500">
        Decodes locally in your browser. Signature is not verified.
      </p>
      {decoded && "error" in decoded && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {decoded.error}
        </p>
      )}
      {decoded && !("error" in decoded) && (
        <>
          <ToolPanel title="Header">
            <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-4 font-mono text-sm dark:bg-zinc-800">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </ToolPanel>
          <ToolPanel title="Payload">
            <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-4 font-mono text-sm dark:bg-zinc-800">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </ToolPanel>
          {decoded.signature && (
            <ToolPanel title="Signature (encoded)">
              <p className="break-all font-mono text-xs text-zinc-600 dark:text-zinc-400">
                {decoded.signature}
              </p>
            </ToolPanel>
          )}
        </>
      )}
    </div>
  );
}
