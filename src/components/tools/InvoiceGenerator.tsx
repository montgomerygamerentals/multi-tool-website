"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export type DocType = "invoice" | "receipt" | "quote";
/** @deprecated Use DocType — alias for tool wiring */
export type InvoiceDocType = DocType;

interface Line {
  id: string;
  desc: string;
  qty: string;
  price: string;
}

interface SavedDoc {
  id: string;
  type: DocType;
  title: string;
  savedAt: string;
  payload: string;
}

const STORAGE_KEY = "fft-invoices-v1";

export default function InvoiceGenerator({ docType }: { docType: DocType }) {
  const [fromName, setFromName] = useState("Your Business");
  const [toName, setToName] = useState("Client Name");
  const [number, setNumber] = useState("1001");
  const [lines, setLines] = useState<Line[]>([
    { id: "1", desc: "Service", qty: "1", price: "100" },
  ]);
  const [saved, setSaved] = useState<SavedDoc[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw) as SavedDoc[]);
    } catch {
      /* ignore */
    }
  }, []);

  const total = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + (Number(line.qty) || 0) * (Number(line.price) || 0),
        0,
      ),
    [lines],
  );

  const persist = (next: SavedDoc[]) => {
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const saveLocal = () => {
    const payload = JSON.stringify({ fromName, toName, number, lines, total, docType });
    const doc: SavedDoc = {
      id: crypto.randomUUID(),
      type: docType,
      title: `${docType} #${number}`,
      savedAt: new Date().toISOString(),
      payload,
    };
    persist([doc, ...saved].slice(0, 30));
  };

  const clearInputs = () => {
    setFromName("");
    setToName("");
    setNumber("");
    setLines([{ id: crypto.randomUUID(), desc: "", qty: "", price: "" }]);
  };

  const exportPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(docType.toUpperCase(), 14, 20);
    doc.setFontSize(11);
    doc.text(`From: ${fromName}`, 14, 32);
    doc.text(`To: ${toName}`, 14, 40);
    doc.text(`No: ${number}`, 14, 48);
    let y = 62;
    lines.forEach((line) => {
      const lineTotal = (Number(line.qty) || 0) * (Number(line.price) || 0);
      doc.text(
        `${line.desc}  qty ${line.qty}  $${Number(line.price).toFixed(2)}  = $${lineTotal.toFixed(2)}`,
        14,
        y,
      );
      y += 8;
    });
    doc.text(`Total: $${total.toFixed(2)}`, 14, y + 6);
    doc.save(`${docType}-${number}.pdf`);
  };

  return (
    <div className="space-y-6">
      <ToolPanel
        title={`${docType[0].toUpperCase()}${docType.slice(1)} details`}
        onClear={clearInputs}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <input value={fromName} onChange={(e) => setFromName(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="From" />
          <input value={toName} onChange={(e) => setToName(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="To" />
          <input value={number} onChange={(e) => setNumber(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Number" />
        </div>
        <div className="mt-4 space-y-2">
          {lines.map((line, idx) => (
            <div key={line.id} className="grid gap-2 sm:grid-cols-4">
              <input
                value={line.desc}
                onChange={(e) =>
                  setLines((rows) =>
                    rows.map((r, i) => (i === idx ? { ...r, desc: e.target.value } : r)),
                  )
                }
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm sm:col-span-2 dark:border-zinc-700 dark:bg-zinc-800"
                placeholder="Description"
              />
              <input
                value={line.qty}
                onChange={(e) =>
                  setLines((rows) =>
                    rows.map((r, i) => (i === idx ? { ...r, qty: e.target.value } : r)),
                  )
                }
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                placeholder="Qty"
              />
              <input
                value={line.price}
                onChange={(e) =>
                  setLines((rows) =>
                    rows.map((r, i) => (i === idx ? { ...r, price: e.target.value } : r)),
                  )
                }
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                placeholder="Price"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 text-sm text-indigo-600"
          onClick={() =>
            setLines((rows) => [
              ...rows,
              { id: crypto.randomUUID(), desc: "", qty: "1", price: "0" },
            ])
          }
        >
          + Add line
        </button>
        <p className="mt-4 text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={exportPdf} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white">
            Download PDF
          </button>
          <button type="button" onClick={saveLocal} className="rounded-lg bg-zinc-100 px-4 py-2 text-sm dark:bg-zinc-800">
            Save in browser
          </button>
        </div>
      </ToolPanel>
      {saved.filter((d) => d.type === docType).length > 0 && (
        <ToolPanel title="Saved locally">
          <ul className="space-y-2 text-sm">
            {saved
              .filter((d) => d.type === docType)
              .map((d) => (
                <li key={d.id} className="flex justify-between gap-2">
                  <span>
                    {d.title} · {new Date(d.savedAt).toLocaleString()}
                  </span>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => persist(saved.filter((x) => x.id !== d.id))}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </ToolPanel>
      )}
    </div>
  );
}
