"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export type FancyStyle =
  | "all"
  | "bold"
  | "italic"
  | "bold-italic"
  | "script"
  | "bold-script"
  | "double-struck"
  | "monospace"
  | "fullwidth"
  | "circled"
  | "squared"
  | "small-caps"
  | "upside-down"
  | "bubble";

const STYLE_LABELS: Record<Exclude<FancyStyle, "all">, string> = {
  bold: "Bold",
  italic: "Italic",
  "bold-italic": "Bold Italic",
  script: "Cursive / Script",
  "bold-script": "Bold Script",
  "double-struck": "Double Struck",
  monospace: "Monospace",
  fullwidth: "Fullwidth",
  circled: "Circled",
  squared: "Squared",
  "small-caps": "Small Caps",
  "upside-down": "Upside Down",
  bubble: "Bubble",
};

/** Mathematical Script — Unicode has holes; map letters explicitly. */
const SCRIPT_MAP: Record<string, string> = {
  A: "\u{1D49C}",
  B: "\u212C",
  C: "\u{1D49E}",
  D: "\u{1D49F}",
  E: "\u2130",
  F: "\u2131",
  G: "\u{1D4A2}",
  H: "\u210B",
  I: "\u2110",
  J: "\u{1D4A5}",
  K: "\u{1D4A6}",
  L: "\u2112",
  M: "\u2133",
  N: "\u{1D4A9}",
  O: "\u{1D4AA}",
  P: "\u{1D4AB}",
  Q: "\u{1D4AC}",
  R: "\u211B",
  S: "\u{1D4AE}",
  T: "\u{1D4AF}",
  U: "\u{1D4B0}",
  V: "\u{1D4B1}",
  W: "\u{1D4B2}",
  X: "\u{1D4B3}",
  Y: "\u{1D4B4}",
  Z: "\u{1D4B5}",
  a: "\u{1D4B6}",
  b: "\u{1D4B7}",
  c: "\u{1D4B8}",
  d: "\u{1D4B9}",
  e: "\u212F",
  f: "\u{1D4BB}",
  g: "\u210A",
  h: "\u{1D4BD}",
  i: "\u{1D4BE}",
  j: "\u{1D4BF}",
  k: "\u{1D4C0}",
  l: "\u{1D4C1}",
  m: "\u{1D4C2}",
  n: "\u{1D4C3}",
  o: "\u2134",
  p: "\u{1D4C5}",
  q: "\u{1D4C6}",
  r: "\u{1D4C7}",
  s: "\u{1D4C8}",
  t: "\u{1D4C9}",
  u: "\u{1D4CA}",
  v: "\u{1D4CB}",
  w: "\u{1D4CC}",
  x: "\u{1D4CD}",
  y: "\u{1D4CE}",
  z: "\u{1D4CF}",
};

/** Mathematical Italic — lowercase h is Planck constant (U+210E). */
const ITALIC_MAP: Record<string, string> = Object.fromEntries([
  ...Array.from({ length: 26 }, (_, i) => [
    String.fromCharCode(65 + i),
    String.fromCodePoint(0x1d434 + i),
  ]),
  // a–g: 1D44E–1D454, h: 210E, i–z: 1D456–1D467
  ...Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(97 + i);
    const code =
      letter === "h" ? 0x210e : letter < "h" ? 0x1d44e + i : 0x1d456 + (i - 8);
    return [letter, String.fromCodePoint(code)];
  }),
]);

const DOUBLE_STRUCK_MAP: Record<string, string> = {
  A: "\u{1D538}",
  B: "\u{1D539}",
  C: "\u2102",
  D: "\u{1D53B}",
  E: "\u{1D53C}",
  F: "\u{1D53D}",
  G: "\u{1D53E}",
  H: "\u210D",
  I: "\u{1D540}",
  J: "\u{1D541}",
  K: "\u{1D542}",
  L: "\u{1D543}",
  M: "\u{1D544}",
  N: "\u2115",
  O: "\u{1D546}",
  P: "\u2119",
  Q: "\u211A",
  R: "\u211D",
  S: "\u{1D54A}",
  T: "\u{1D54B}",
  U: "\u{1D54C}",
  V: "\u{1D54D}",
  W: "\u{1D54E}",
  X: "\u{1D54F}",
  Y: "\u{1D550}",
  Z: "\u2124",
  a: "\u{1D552}",
  b: "\u{1D553}",
  c: "\u{1D554}",
  d: "\u{1D555}",
  e: "\u{1D556}",
  f: "\u{1D557}",
  g: "\u{1D558}",
  h: "\u{1D559}",
  i: "\u{1D55A}",
  j: "\u{1D55B}",
  k: "\u{1D55C}",
  l: "\u{1D55D}",
  m: "\u{1D55E}",
  n: "\u{1D55F}",
  o: "\u{1D560}",
  p: "\u{1D561}",
  q: "\u{1D562}",
  r: "\u{1D563}",
  s: "\u{1D564}",
  t: "\u{1D565}",
  u: "\u{1D566}",
  v: "\u{1D567}",
  w: "\u{1D568}",
  x: "\u{1D569}",
  y: "\u{1D56A}",
  z: "\u{1D56B}",
};

const UPSIDE_MAP: Record<string, string> = {
  a: "\u0250",
  b: "q",
  c: "\u0254",
  d: "p",
  e: "\u01DD",
  f: "\u025F",
  g: "\u0183",
  h: "\u0265",
  i: "\u1D09",
  j: "\u027E",
  k: "\u029E",
  l: "l",
  m: "\u026F",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "\u0279",
  s: "s",
  t: "\u0287",
  u: "n",
  v: "\u028C",
  w: "\u028D",
  x: "x",
  y: "\u028E",
  z: "z",
  A: "\u2200",
  B: "\uA4ED",
  C: "\u0186",
  D: "\u15E1",
  E: "\u018E",
  F: "\u2132",
  G: "\u2141",
  H: "H",
  I: "I",
  J: "\u017F",
  K: "\u029E",
  L: "\u02E5",
  M: "W",
  N: "N",
  O: "O",
  P: "\u0500",
  Q: "\u038C",
  R: "\u1D1A",
  S: "S",
  T: "\u2534",
  U: "\u2229",
  V: "\u039B",
  W: "M",
  X: "X",
  Y: "\u2144",
  Z: "Z",
  " ": " ",
  ".": "\u02D9",
  ",": "'",
  "'": ",",
  '"': "\u201E",
  "!": "\u00A1",
  "?": "\u00BF",
};

function mapAlpha(
  text: string,
  lookup: Record<string, string>,
): string {
  return [...text].map((ch) => lookup[ch] ?? ch).join("");
}

function mapRange(
  text: string,
  upperStart: number,
  lowerStart: number,
): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(upperStart + (code - 65));
      }
      if (code >= 97 && code <= 122) {
        return String.fromCodePoint(lowerStart + (code - 97));
      }
      return ch;
    })
    .join("");
}

function toSmallCaps(text: string): string {
  const small = [
    "\u1D00",
    "\u0299",
    "\u1D04",
    "\u1D05",
    "\u1D07",
    "\uA730",
    "\u0262",
    "\u029C",
    "\u026A",
    "\u1D0A",
    "\u1D0B",
    "\u029F",
    "\u1D0D",
    "\u0274",
    "\u1D0F",
    "\u1D18",
    "\u01EB",
    "\u0280",
    "s",
    "\u1D1B",
    "\u1D1C",
    "\u1D20",
    "\u1D21",
    "x",
    "\u028F",
    "\u1D22",
  ];
  return [...text]
    .map((ch) => {
      const lower = ch.toLowerCase();
      if (lower >= "a" && lower <= "z") {
        return small[lower.charCodeAt(0) - 97];
      }
      return ch;
    })
    .join("");
}

function toUpsideDown(text: string): string {
  return [...text]
    .map((ch) => UPSIDE_MAP[ch] ?? ch)
    .reverse()
    .join("");
}

function toBubble(text: string): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(0x24b6 + (code - 65));
      }
      if (code >= 97 && code <= 122) {
        return String.fromCodePoint(0x24d0 + (code - 97));
      }
      if (code >= 49 && code <= 57) {
        return String.fromCodePoint(0x2460 + (code - 49));
      }
      if (code === 48) return "\u24EA";
      return ch;
    })
    .join("");
}

export function transformFancy(
  text: string,
  style: Exclude<FancyStyle, "all">,
): string {
  switch (style) {
    case "bold":
      return mapRange(text, 0x1d400, 0x1d41a);
    case "italic":
      return mapAlpha(text, ITALIC_MAP);
    case "bold-italic":
      return mapRange(text, 0x1d468, 0x1d482);
    case "script":
      return mapAlpha(text, SCRIPT_MAP);
    case "bold-script":
      return mapRange(text, 0x1d4d0, 0x1d4ea);
    case "double-struck":
      return mapAlpha(text, DOUBLE_STRUCK_MAP);
    case "monospace":
      return mapRange(text, 0x1d670, 0x1d68a);
    case "fullwidth":
      return [...text]
        .map((ch) => {
          const code = ch.codePointAt(0)!;
          if (code >= 33 && code <= 126) {
            return String.fromCodePoint(0xff01 + (code - 33));
          }
          return ch;
        })
        .join("");
    case "circled":
      return toBubble(text);
    case "squared":
      return [...text]
        .map((ch) => {
          const upper = ch.toUpperCase();
          if (upper >= "A" && upper <= "Z") {
            return String.fromCodePoint(0x1f130 + (upper.charCodeAt(0) - 65));
          }
          return ch;
        })
        .join("");
    case "small-caps":
      return toSmallCaps(text);
    case "upside-down":
      return toUpsideDown(text);
    case "bubble":
      return toBubble(text);
  }
}

interface FancyTextGeneratorProps {
  style?: FancyStyle;
}

export default function FancyTextGenerator({
  style = "all",
}: FancyTextGeneratorProps) {
  const [text, setText] = useState("Hello World");
  const [copied, setCopied] = useState<string | null>(null);

  const styles = useMemo(() => {
    if (style === "all") {
      return Object.keys(STYLE_LABELS) as Exclude<FancyStyle, "all">[];
    }
    return [style];
  }, [style]);

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const clearInputs = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Your text" onClear={clearInputs}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          placeholder="Type something…"
        />
      </ToolPanel>

      <div className="space-y-3">
        {styles.map((s) => {
          const value = transformFancy(text || " ", s);
          return (
            <div
              key={s}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {STYLE_LABELS[s]}
                </p>
                <p className="mt-1 break-all text-lg text-zinc-900 dark:text-zinc-50">
                  {value}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copy(value, s)}
                className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                {copied === s ? "Copied" : "Copy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
