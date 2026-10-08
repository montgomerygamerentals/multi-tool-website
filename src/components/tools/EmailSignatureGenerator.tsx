"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function EmailSignatureGenerator() {
  const [name, setName] = useState("Alex Rivera");
  const [title, setTitle] = useState("Product Manager");
  const [company, setCompany] = useState("Acme Co");
  const [phone, setPhone] = useState("(555) 010-2000");
  const [email, setEmail] = useState("alex@acme.example");
  const [website, setWebsite] = useState("https://acme.example");
  const [variant, setVariant] = useState<"gmail" | "outlook">("gmail");

  const clearInputs = () => {
    setName("");
    setTitle("");
    setCompany("");
    setPhone("");
    setEmail("");
    setWebsite("");
  };

  const html = useMemo(() => {
    if (variant === "outlook") {
      return `<table cellpadding="0" cellspacing="0" style="font-family:Calibri,Arial,sans-serif;font-size:14px;color:#222">
  <tr><td style="font-size:16px;font-weight:bold">${name}</td></tr>
  <tr><td>${title} | ${company}</td></tr>
  <tr><td>${phone} · <a href="mailto:${email}">${email}</a></td></tr>
  <tr><td><a href="${website}">${website}</a></td></tr>
</table>`;
    }
    return `<div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.45;color:#222">
  <div style="font-size:15px;font-weight:700">${name}</div>
  <div style="color:#555">${title}, ${company}</div>
  <div><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none">${email}</a> · ${phone}</div>
  <div><a href="${website}" style="color:#4f46e5;text-decoration:none">${website}</a></div>
</div>`;
  }, [name, title, company, phone, email, website, variant]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button type="button" onClick={() => setVariant("gmail")} className={`rounded-lg px-3 py-2 text-sm ${variant === "gmail" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}>Gmail style</button>
        <button type="button" onClick={() => setVariant("outlook")} className={`rounded-lg px-3 py-2 text-sm ${variant === "outlook" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}>Outlook style</button>
      </div>
      <ToolPanel title="Details" onClear={clearInputs}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Name" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Title" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Company" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Phone" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Email" />
          <input value={website} onChange={(e) => setWebsite(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Website" />
        </div>
      </ToolPanel>
      <ToolPanel title="Preview">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <button
          type="button"
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={() => navigator.clipboard.writeText(html)}
        >
          Copy HTML
        </button>
      </ToolPanel>
    </div>
  );
}
