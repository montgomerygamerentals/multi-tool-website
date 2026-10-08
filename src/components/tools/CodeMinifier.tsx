"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export type CodeMinifierKind = "html" | "css" | "js";

function minifyHtml(src: string): string {
  return src
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

function minifyCss(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function minifyJs(src: string): string {
  let out = "";
  let i = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let prev = "";

  while (i < src.length) {
    const ch = src[i]!;
    const next = src[i + 1];

    if (inLineComment) {
      if (ch === "\n") {
        inLineComment = false;
        out += ch;
      }
      i++;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (!inSingle && !inDouble && !inTemplate) {
      if (ch === "/" && next === "/") {
        inLineComment = true;
        i += 2;
        continue;
      }
      if (ch === "/" && next === "*") {
        inBlockComment = true;
        i += 2;
        continue;
      }
    }
    if (!inDouble && !inTemplate && ch === "'" && prev !== "\\") {
      inSingle = !inSingle;
      out += ch;
      prev = ch;
      i++;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && prev !== "\\") {
      inDouble = !inDouble;
      out += ch;
      prev = ch;
      i++;
      continue;
    }
    if (!inSingle && !inDouble && ch === "`" && prev !== "\\") {
      inTemplate = !inTemplate;
      out += ch;
      prev = ch;
      i++;
      continue;
    }
    if (!inSingle && !inDouble && !inTemplate && /\s/.test(ch)) {
      if (out.length && !/\s$/.test(out)) out += " ";
      i++;
      continue;
    }
    out += ch;
    prev = ch;
    i++;
  }
  return out.replace(/\s+([{}();,:])/g, "$1").replace(/([{}();,:])\s+/g, "$1").trim();
}

const MINIFIERS: Record<CodeMinifierKind, (s: string) => string> = {
  html: minifyHtml,
  css: minifyCss,
  js: minifyJs,
};

const PLACEHOLDERS: Record<CodeMinifierKind, string> = {
  html: "<!-- Paste HTML -->",
  css: "/* Paste CSS */",
  js: "// Paste JavaScript",
};

interface CodeMinifierProps {
  kind: CodeMinifierKind;
}

export default function CodeMinifier({ kind }: CodeMinifierProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minify = () => {
    setOutput(MINIFIERS[kind](input));
  };

  const clearInputs = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Input" onClear={clearInputs}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          placeholder={PLACEHOLDERS[kind]}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </ToolPanel>
      <button
        type="button"
        onClick={minify}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Minify
      </button>
      {output && (
        <ToolPanel title="Minified output">
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <p className="mt-2 text-xs text-zinc-500">
            {input.length} → {output.length} chars (
            {input.length ? Math.round((1 - output.length / input.length) * 100) : 0}% smaller)
          </p>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Copy
          </button>
        </ToolPanel>
      )}
    </div>
  );
}
