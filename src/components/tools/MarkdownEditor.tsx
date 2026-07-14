"use client";

import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ToolPanel from "@/components/ui/ToolPanel";

const SAMPLE = `# Markdown Preview

Write **bold**, *italic*, or \`code\`.

- List item one
- List item two

\`\`\`js
console.log("hello");
\`\`\`
`;

export default function MarkdownEditor() {
  const [source, setSource] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const html = useMemo(() => {
    if (!ready) return "";
    const raw = marked.parse(source, { async: false }) as string;
    return DOMPurify.sanitize(raw);
  }, [ready, source]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyHtml}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          {copied ? "Copied HTML!" : "Copy HTML"}
        </button>
        <button
          type="button"
          onClick={() => setSource("")}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel title="Markdown">
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            rows={22}
            spellCheck
            className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm leading-relaxed dark:border-zinc-700 dark:bg-zinc-950"
          />
        </ToolPanel>
        <ToolPanel title="Preview">
          <div
            className="prose prose-zinc max-w-none min-h-[28rem] rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:prose-invert dark:border-zinc-700 dark:bg-zinc-950 [&_a]:text-indigo-600 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 dark:[&_code]:bg-zinc-800 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_p]:mb-3 [&_pre]:mb-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-100 [&_pre]:p-3 dark:[&_pre]:bg-zinc-800"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ToolPanel>
      </div>
    </div>
  );
}
