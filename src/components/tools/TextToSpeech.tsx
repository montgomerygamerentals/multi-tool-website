"use client";

import { useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

export default function TextToSpeech() {
  const [text, setText] = useState("Hello! Type or paste text to hear it spoken aloud.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceUri, setVoiceUri] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      if (!voiceUri && list[0]) setVoiceUri(list[0].voiceURI);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [voiceUri]);

  const speak = () => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.voiceURI === voiceUri);
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = pitch;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utterRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const clearInputs = () => {
    stop();
    setText("");
    setRate(0.5);
    setPitch(0.5);
    setVoiceUri("");
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Text" onClear={clearInputs}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Text to speak…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </ToolPanel>
      <ToolPanel title="Voice settings">
        <label className="mb-2 block text-sm font-medium">Voice</label>
        <select
          value={voiceUri}
          onChange={(e) => setVoiceUri(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
        <label className="mb-2 block text-sm font-medium">Rate: {rate.toFixed(1)}</label>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="mb-4 w-full accent-indigo-600"
        />
        <label className="mb-2 block text-sm font-medium">Pitch: {pitch.toFixed(1)}</label>
        <input
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={pitch}
          onChange={(e) => setPitch(Number(e.target.value))}
          className="mb-4 w-full accent-indigo-600"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={speak}
            disabled={!text.trim() || speaking}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Speak
          </button>
          <button
            type="button"
            onClick={stop}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            Stop
          </button>
        </div>
      </ToolPanel>
    </div>
  );
}
