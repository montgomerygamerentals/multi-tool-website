"use client";

import { useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export type DeviceTest =
  | "all"
  | "mic"
  | "webcam"
  | "keyboard"
  | "cps"
  | "dead-pixel";

function MicTest() {
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let raf = 0;
    let ctx: AudioContext | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (const v of data) {
            const n = (v - 128) / 128;
            sum += n * n;
          }
          setLevel(Math.min(100, Math.sqrt(sum / data.length) * 300));
          raf = requestAnimationFrame(tick);
        };
        tick();
      } catch {
        setError("Microphone permission denied or unavailable.");
      }
    })();
    return () => {
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      void ctx?.close();
    };
  }, []);

  return (
    <ToolPanel title="Microphone test">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="h-4 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full bg-indigo-600 transition-[width]"
            style={{ width: `${level}%` }}
          />
        </div>
      )}
    </ToolPanel>
  );
}

function WebcamTest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        setError("Webcam permission denied or unavailable.");
      }
    })();
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  return (
    <ToolPanel title="Webcam test">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <video ref={videoRef} className="w-full max-w-md rounded-lg bg-black" muted playsInline />
      )}
    </ToolPanel>
  );
}

function KeyboardTest() {
  const [last, setLast] = useState<string>("—");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setLast(e.key === " " ? "Space" : e.key);
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const clearInputs = () => setLast("");

  return (
    <ToolPanel title="Keyboard tester" onClear={clearInputs}>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Press any key</p>
      <p className="mt-3 text-3xl font-bold text-indigo-600">{last}</p>
    </ToolPanel>
  );
}

function CpsTest() {
  const [clicks, setClicks] = useState(0);
  const [running, setRunning] = useState(false);
  const [cps, setCps] = useState(0);
  const startRef = useRef(0);

  const onClick = () => {
    if (!running) {
      setRunning(true);
      setClicks(1);
      startRef.current = Date.now();
      window.setTimeout(() => {
        setRunning(false);
        setCps(1);
      }, 5000);
      return;
    }
    setClicks((c) => {
      const next = c + 1;
      const elapsed = (Date.now() - startRef.current) / 1000;
      setCps(next / Math.max(elapsed, 0.001));
      return next;
    });
  };

  const clearInputs = () => {
    setClicks(0);
    setRunning(false);
    setCps(0);
  };

  return (
    <ToolPanel title="Mouse CPS test (5 seconds)" onClear={clearInputs}>
      <button
        type="button"
        onClick={onClick}
        className="h-40 w-full rounded-xl bg-indigo-600 text-xl font-semibold text-white"
      >
        {running ? "Click!" : "Start"}
      </button>
      <p className="mt-3 text-sm">
        Clicks: {clicks} · CPS: {cps.toFixed(2)}
      </p>
    </ToolPanel>
  );
}

function DeadPixelTest() {
  const colors = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"];
  const [idx, setIdx] = useState(0);
  const [full, setFull] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowRight" || e.key === " ") setIdx((i) => (i + 1) % colors.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + colors.length) % colors.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full, colors.length]);

  const clearInputs = () => {
    setIdx(0);
    setFull(false);
  };

  return (
    <ToolPanel title="Dead pixel test" onClear={clearInputs}>
      <button
        type="button"
        onClick={() => {
          setFull(true);
          void ref.current?.requestFullscreen?.();
        }}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
      >
        Start fullscreen
      </button>
      <p className="mt-2 text-xs text-zinc-500">
        Arrow keys / Space cycle colors. Esc exits.
      </p>
      {full && (
        <div
          ref={ref}
          onClick={() => setIdx((i) => (i + 1) % colors.length)}
          style={{ background: colors[idx] }}
          className="fixed inset-0 z-[100]"
        />
      )}
    </ToolPanel>
  );
}

export default function DeviceTestPack({ test = "all" }: { test?: DeviceTest }) {
  const show = (t: DeviceTest) => test === "all" || test === t;
  return (
    <div className="space-y-6">
      {show("mic") && <MicTest />}
      {show("webcam") && <WebcamTest />}
      {show("keyboard") && <KeyboardTest />}
      {show("cps") && <CpsTest />}
      {show("dead-pixel") && <DeadPixelTest />}
    </div>
  );
}
