"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

export type HomeDiyKind =
  | "concrete"
  | "square-footage"
  | "roof-pitch"
  | "deck"
  | "mulch"
  | "paint"
  | "tile"
  | "fence";

const TITLES: Record<HomeDiyKind, string> = {
  concrete: "Concrete calculator",
  "square-footage": "Square footage calculator",
  "roof-pitch": "Roof pitch calculator",
  deck: "Deck board calculator",
  mulch: "Mulch calculator",
  paint: "Paint calculator",
  tile: "Tile calculator",
  fence: "Fence calculator",
};

export default function HomeDiyCalculator({ kind }: { kind: HomeDiyKind }) {
  const [a, setA] = useState("10");
  const [b, setB] = useState("12");
  const [c, setC] = useState("4");

  const result = useMemo(() => {
    const x = Number(a);
    const y = Number(b);
    const z = Number(c);
    if (![x, y, z].every((n) => Number.isFinite(n) && n >= 0)) return null;

    switch (kind) {
      case "concrete": {
        const cuFt = x * y * (z / 12);
        const cuYd = cuFt / 27;
        return {
          primary: `${cuYd.toFixed(2)} yd³`,
          label: "Concrete volume",
          steps: [
            `Volume (ft³) = length × width × (thickness_in ÷ 12) = ${x} × ${y} × (${z}/12) = ${cuFt.toFixed(2)} ft³.`,
            `Cubic yards = ft³ ÷ 27 = ${cuYd.toFixed(2)} yd³. Order a little extra for waste.`,
          ],
        };
      }
      case "square-footage": {
        const area = x * y;
        return {
          primary: `${area.toFixed(1)} sq ft`,
          label: "Area",
          steps: [`Area = length × width = ${x} × ${y} = ${area.toFixed(1)} sq ft.`],
        };
      }
      case "roof-pitch": {
        const pitch = y === 0 ? 0 : (x / y) * 12;
        const deg = (Math.atan(x / (y || 1)) * 180) / Math.PI;
        return {
          primary: `${pitch.toFixed(1)}/12`,
          label: "Pitch (rise/run)",
          steps: [
            `Pitch = (rise ÷ run) × 12 = (${x} ÷ ${y}) × 12 ≈ ${pitch.toFixed(1)}/12.`,
            `Angle ≈ arctan(rise/run) ≈ ${deg.toFixed(1)}°.`,
          ],
        };
      }
      case "deck": {
        const area = x * y;
        const boardCoverage = (z / 12) * 8;
        const boards = boardCoverage > 0 ? Math.ceil(area / boardCoverage) : 0;
        return {
          primary: `${boards} boards`,
          label: "Approx 8ft boards",
          steps: [
            `Deck area = ${x} × ${y} = ${area} sq ft.`,
            `Each 8ft board at ${z}" width covers ~${boardCoverage.toFixed(2)} sq ft (ignoring gaps).`,
            `Boards ≈ ceil(area ÷ coverage) = ${boards}. Add 10% waste when ordering.`,
          ],
        };
      }
      case "mulch": {
        const cuFt = x * y * (z / 12);
        const cuYd = cuFt / 27;
        const bags = Math.ceil(cuFt / 2);
        return {
          primary: `${cuYd.toFixed(2)} yd³`,
          label: "Mulch volume",
          steps: [
            `Volume = ${x} × ${y} × (${z}/12) = ${cuFt.toFixed(1)} ft³ (${cuYd.toFixed(2)} yd³).`,
            `About ${bags} bags if each bag is 2 ft³.`,
          ],
        };
      }
      case "paint": {
        const walls = x * y;
        const coats = Math.max(1, z);
        const gallons = walls / 350 * coats;
        return {
          primary: `${gallons.toFixed(2)} gal`,
          label: "Paint needed",
          steps: [
            `Wall area ≈ ${x} × ${y} = ${walls} sq ft (openings ignored).`,
            `Coverage assumption ~350 sq ft/gallon per coat.`,
            `Gallons ≈ area ÷ 350 × ${coats} coats = ${gallons.toFixed(2)}.`,
          ],
        };
      }
      case "tile": {
        const area = x * y;
        const tileArea = (z * z) / 144;
        const tiles = tileArea > 0 ? Math.ceil((area / tileArea) * 1.1) : 0;
        return {
          primary: `${tiles} tiles`,
          label: "Tiles (+10% waste)",
          steps: [
            `Room = ${area} sq ft. Tile face = (${z}×${z})/144 = ${tileArea.toFixed(3)} sq ft.`,
            `Count ≈ ceil(area ÷ tile × 1.10) = ${tiles}.`,
          ],
        };
      }
      case "fence": {
        const perimeter = 2 * (x + y);
        const posts = z > 0 ? Math.ceil(perimeter / z) + 1 : 0;
        return {
          primary: `${perimeter.toFixed(1)} ft`,
          label: "Fence length",
          steps: [
            `Perimeter = 2 × (L + W) = 2 × (${x} + ${y}) = ${perimeter.toFixed(1)} ft.`,
            `Posts ≈ perimeter ÷ spacing (${z} ft) + 1 ≈ ${posts} posts.`,
          ],
        };
      }
    }
  }, [kind, a, b, c]);

  const labels: Record<HomeDiyKind, [string, string, string]> = {
    concrete: ["Length (ft)", "Width (ft)", "Thickness (in)"],
    "square-footage": ["Length (ft)", "Width (ft)", "Unused"],
    "roof-pitch": ["Rise (in)", "Run (in)", "Unused"],
    deck: ["Length (ft)", "Width (ft)", "Board width (in)"],
    mulch: ["Length (ft)", "Width (ft)", "Depth (in)"],
    paint: ["Wall length sum (ft)", "Wall height (ft)", "Coats"],
    tile: ["Room length (ft)", "Room width (ft)", "Tile side (in)"],
    fence: ["Yard length (ft)", "Yard width (ft)", "Post spacing (ft)"],
  };

  const [la, lb, lc] = labels[kind];

  const clearInputs = () => {
    setA("");
    setB("");
    setC("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title={TITLES[kind]} onClear={clearInputs}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">{la}</label>
            <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{lb}</label>
            <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
          {lc !== "Unused" && (
            <div>
              <label className="mb-1 block text-sm font-medium">{lc}</label>
              <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" />
            </div>
          )}
        </div>
      </ToolPanel>
      {result && (
        <>
          <div className="rounded-xl bg-indigo-50 p-6 text-center dark:bg-indigo-950/30">
            <p className="text-sm text-zinc-500">{result.label}</p>
            <p className="text-3xl font-bold text-indigo-600">{result.primary}</p>
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
