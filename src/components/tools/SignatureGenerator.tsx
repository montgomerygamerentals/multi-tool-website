"use client";

import { useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function SignatureGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typed, setTyped] = useState("Jane Doe");
  const [font, setFont] = useState("Georgia");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, []);

  useEffect(() => {
    if (mode !== "type") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111827";
    ctx.font = `48px ${font}`;
    ctx.fillText(typed, 40, 110);
  }, [mode, typed, font]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * e.currentTarget.width,
      y: ((e.clientY - rect.top) / rect.height) * e.currentTarget.height,
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  };

  const clearInputs = () => {
    setTyped("");
    clearCanvas();
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "signature.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode("draw")} className={`rounded-lg px-3 py-2 text-sm ${mode === "draw" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}>Draw</button>
        <button type="button" onClick={() => setMode("type")} className={`rounded-lg px-3 py-2 text-sm ${mode === "type" ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800"}`}>Type</button>
      </div>
      {mode === "type" && (
        <ToolPanel title="Typed signature">
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={typed} onChange={(e) => setTyped(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
            <select value={font} onChange={(e) => setFont(e.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
              <option value="Georgia">Georgia</option>
              <option value="Brush Script MT, cursive">Brush Script</option>
              <option value="Palatino Linotype, serif">Palatino</option>
              <option value="Comic Sans MS, cursive">Casual</option>
            </select>
          </div>
        </ToolPanel>
      )}
      <ToolPanel title="Preview" onClear={clearInputs}>
        <canvas
          ref={canvasRef}
          width={700}
          height={200}
          className="w-full touch-none rounded-lg border border-zinc-300 bg-white dark:border-zinc-700"
          onPointerDown={(e) => {
            if (mode !== "draw") return;
            drawing.current = true;
            const ctx = e.currentTarget.getContext("2d");
            const p = pos(e);
            ctx?.beginPath();
            ctx?.moveTo(p.x, p.y);
          }}
          onPointerMove={(e) => {
            if (!drawing.current || mode !== "draw") return;
            const ctx = e.currentTarget.getContext("2d");
            const p = pos(e);
            ctx?.lineTo(p.x, p.y);
            ctx?.stroke();
          }}
          onPointerUp={() => {
            drawing.current = false;
          }}
        />
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={clearCanvas} className="rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">Clear</button>
          <button type="button" onClick={download} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Download PNG</button>
        </div>
      </ToolPanel>
    </div>
  );
}
