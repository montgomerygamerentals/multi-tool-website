"use client";

import { useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

function xmlNodeToJson(node: Node): unknown {
  if (node.nodeType === Node.TEXT_NODE) {
    const t = node.textContent?.trim();
    return t || undefined;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return undefined;
  const el = node as Element;
  const obj: Record<string, unknown> = {};
  for (const attr of Array.from(el.attributes)) {
    obj[`@${attr.name}`] = attr.value;
  }
  const children = Array.from(el.childNodes).filter(
    (n) => !(n.nodeType === Node.TEXT_NODE && !n.textContent?.trim()),
  );
  if (children.length === 0) return obj;
  const childMap: Record<string, unknown[]> = {};
  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent?.trim();
      if (text) obj["#text"] = text;
      continue;
    }
    const name = (child as Element).tagName;
    const val = xmlNodeToJson(child);
    if (!childMap[name]) childMap[name] = [];
    childMap[name]!.push(val);
  }
  for (const [k, vals] of Object.entries(childMap)) {
    obj[k] = vals.length === 1 ? vals[0] : vals;
  }
  return obj;
}

function jsonToXml(value: unknown, tag = "root", indent = 0): string {
  const pad = "  ".repeat(indent);
  if (value === null || value === undefined) return `${pad}<${tag}/>`;
  if (typeof value !== "object") {
    return `${pad}<${tag}>${escapeXml(String(value))}</${tag}>`;
  }
  const rec = value as Record<string, unknown>;
  const attrs: string[] = [];
  let text: string | undefined;
  const children: string[] = [];
  for (const [k, v] of Object.entries(rec)) {
    if (k.startsWith("@")) attrs.push(`${k.slice(1)}="${escapeXml(String(v))}"`);
    else if (k === "#text") text = String(v);
    else if (Array.isArray(v)) {
      for (const item of v) children.push(jsonToXml(item, k, indent + 1));
    } else children.push(jsonToXml(v, k, indent + 1));
  }
  const attrStr = attrs.length ? " " + attrs.join(" ") : "";
  if (children.length === 0 && !text) return `${pad}<${tag}${attrStr}/>`;
  const inner = [...children, text ? `${pad}  ${escapeXml(text)}` : ""]
    .filter(Boolean)
    .join("\n");
  return `${pad}<${tag}${attrStr}>\n${inner}\n${pad}</${tag}>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default function XmlJsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const xmlToJson = () => {
    setError(null);
    try {
      const doc = new DOMParser().parseFromString(input.trim(), "text/xml");
      const err = doc.querySelector("parsererror");
      if (err) throw new Error("Invalid XML");
      const root = doc.documentElement;
      const json = { [root.tagName]: xmlNodeToJson(root) };
      setOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid XML");
      setOutput("");
    }
  };

  const clearInputs = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const jsonToXmlAction = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input) as Record<string, unknown>;
      const keys = Object.keys(parsed);
      if (keys.length !== 1) throw new Error("JSON root should be a single object with one root tag key.");
      const rootTag = keys[0]!;
      setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${jsonToXml(parsed[rootTag], rootTag, 0)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Input" onClear={clearInputs}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder="Paste XML or JSON…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </ToolPanel>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={xmlToJson}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          XML → JSON
        </button>
        <button
          type="button"
          onClick={jsonToXmlAction}
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          JSON → XML
        </button>
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}
      {output && (
        <ToolPanel title="Output">
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
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
