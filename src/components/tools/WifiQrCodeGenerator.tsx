"use client";

import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import ToolPanel from "@/components/ui/ToolPanel";

const MIN_SIZE = 128;
const MAX_SIZE = 2500;

type Encryption = "WPA" | "WEP" | "nopass";

function clampSize(value: number) {
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, value));
}

/** Escape special characters for the WIFI: MeCard-style payload. */
function escapeWifiField(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function buildWifiPayload(
  ssid: string,
  password: string,
  encryption: Encryption,
  hidden: boolean,
) {
  const parts = [
    `T:${encryption}`,
    `S:${escapeWifiField(ssid)}`,
  ];

  if (encryption !== "nopass") {
    parts.push(`P:${escapeWifiField(password)}`);
  }

  if (hidden) {
    parts.push("H:true");
  }

  return `WIFI:${parts.join(";")};;`;
}

export default function WifiQrCodeGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState<Encryption>("WPA");
  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [size, setSize] = useState(256);
  const [sizeInput, setSizeInput] = useState("256");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const commitSize = useCallback((raw: string) => {
    const parsed = Number(raw);
    const next = Number.isFinite(parsed) ? clampSize(parsed) : MIN_SIZE;
    setSize(next);
    setSizeInput(String(next));
  }, []);

  const generate = useCallback(async () => {
    const networkName = ssid.trim();
    if (!networkName) {
      setError("Enter your Wi‑Fi network name (SSID).");
      setDataUrl(null);
      return;
    }

    if (encryption !== "nopass" && !password) {
      setError("Enter the Wi‑Fi password, or choose Open network.");
      setDataUrl(null);
      return;
    }

    setError(null);

    try {
      const payload = buildWifiPayload(
        networkName,
        password,
        encryption,
        hidden,
      );
      const url = await QRCode.toDataURL(payload, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setDataUrl(url);
    } catch {
      setError("Failed to generate QR code. Try a shorter network name or password.");
      setDataUrl(null);
    }
  }, [ssid, password, encryption, hidden, size, fgColor, bgColor]);

  useEffect(() => {
    generate();
  }, [generate]);

  const clearInputs = () => {
    setSsid("");
    setPassword("");
    setEncryption("WPA");
    setHidden(false);
    setShowPassword(false);
    setSize(256);
    setSizeInput("256");
    setFgColor("#000000");
    setBgColor("#ffffff");
    setDataUrl(null);
    setError(null);
  };

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    const safeName = ssid.trim().replace(/[^\w.-]+/g, "-").slice(0, 40) || "wifi";
    a.download = `wifi-qr-${safeName}.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Wi‑Fi details" onClear={clearInputs}>
        <div className="mb-4">
          <label htmlFor="wifi-ssid" className="mb-1 block text-sm font-medium">
            Network name (SSID)
          </label>
          <input
            id="wifi-ssid"
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="e.g. HomeWiFi"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wifi-encryption" className="mb-1 block text-sm font-medium">
            Security
          </label>
          <select
            id="wifi-encryption"
            value={encryption}
            onChange={(e) => setEncryption(e.target.value as Encryption)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Open (no password)</option>
          </select>
        </div>

        {encryption !== "nopass" && (
          <div className="mb-4">
            <label htmlFor="wifi-password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <div className="flex gap-2">
              <input
                id="wifi-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wi‑Fi password"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setHidden((v) => !v)}
          aria-pressed={hidden}
          className={`mb-4 flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
            hidden
              ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/40"
              : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          }`}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Hidden network</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              Network does not broadcast its name
            </span>
          </span>
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
              hidden
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-zinc-400 dark:border-zinc-500"
            }`}
            aria-hidden
          >
            {hidden && (
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 6l3 3 5-5" />
              </svg>
            )}
          </span>
        </button>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">
            Size (px){" "}
            <span className="font-normal text-zinc-500">· max {MAX_SIZE}</span>
          </label>
          <input
            type="number"
            value={sizeInput}
            min={MIN_SIZE}
            max={MAX_SIZE}
            step={64}
            onChange={(e) => {
              const raw = e.target.value;
              setSizeInput(raw);
              const parsed = Number(raw);
              if (
                raw !== "" &&
                Number.isFinite(parsed) &&
                parsed >= MIN_SIZE &&
                parsed <= MAX_SIZE
              ) {
                setSize(parsed);
              }
            }}
            onBlur={() => commitSize(sizeInput)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 sm:max-w-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Foreground</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Background</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg"
            />
          </div>
        </div>
      </ToolPanel>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {dataUrl && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={dataUrl}
            alt={`Wi‑Fi QR code for ${ssid.trim()}`}
            width={size}
            height={size}
            className="block rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-700"
          />
          <p className="max-w-md text-center text-xs text-zinc-500 dark:text-zinc-400">
            Guests scan with their camera to join{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {ssid.trim()}
            </span>
            . Password stays in the code — share only with people you trust.
          </p>
          <button
            type="button"
            onClick={download}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
