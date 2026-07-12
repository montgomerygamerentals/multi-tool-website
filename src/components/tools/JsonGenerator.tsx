"use client";

import { useMemo, useState } from "react";
import ToolPanel from "@/components/ui/ToolPanel";

type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "email"
  | "name"
  | "firstName"
  | "lastName"
  | "uuid"
  | "date"
  | "datetime"
  | "url"
  | "phone"
  | "color"
  | "id"
  | "lorem";

interface Field {
  id: string;
  key: string;
  type: FieldType;
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "null", label: "Null" },
  { value: "id", label: "ID (sequential)" },
  { value: "uuid", label: "UUID" },
  { value: "email", label: "Email" },
  { value: "name", label: "Full name" },
  { value: "firstName", label: "First name" },
  { value: "lastName", label: "Last name" },
  { value: "date", label: "Date" },
  { value: "datetime", label: "Date & time" },
  { value: "url", label: "URL" },
  { value: "phone", label: "Phone" },
  { value: "color", label: "Hex color" },
  { value: "lorem", label: "Lorem text" },
];

const FIRST_NAMES = [
  "Ava", "Noah", "Mia", "Liam", "Zoe", "Ethan", "Iris", "Owen", "Luna", "Leo",
  "Nora", "Kai", "Ruby", "Miles", "Chloe", "Finn", "Ella", "Jude", "Hazel", "Asher",
];

const LAST_NAMES = [
  "Bennett", "Carter", "Hayes", "Morgan", "Reed", "Sullivan", "Walsh", "Brooks",
  "Coleman", "Foster", "Griffin", "Hughes", "Jenkins", "Keller", "Lawson", "Myers",
  "Nolan", "Parker", "Quinn", "Turner",
];

const DOMAINS = ["example.com", "mail.test", "demo.io", "sample.dev", "fake.org"];

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
];

const DEFAULT_FIELDS: Field[] = [
  { id: "1", key: "id", type: "id" },
  { id: "2", key: "name", type: "name" },
  { id: "3", key: "email", type: "email" },
  { id: "4", key: "active", type: "boolean" },
];

const fieldClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function randomDate(withTime: boolean): string {
  const year = randomInt(2020, 2026);
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  if (!withTime) return `${year}-${pad(month)}-${pad(day)}`;
  return `${year}-${pad(month)}-${pad(day)}T${pad(randomInt(0, 23))}:${pad(randomInt(0, 59))}:${pad(randomInt(0, 59))}Z`;
}

function randomUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomLorem(): string {
  const count = randomInt(4, 10);
  const words = Array.from({ length: count }, () => pick(LOREM_WORDS));
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return `${words.join(" ")}.`;
}

function generateValue(type: FieldType, index: number): unknown {
  switch (type) {
    case "string":
      return `value_${index + 1}`;
    case "number":
      return randomInt(1, 1000);
    case "boolean":
      return Math.random() < 0.5;
    case "null":
      return null;
    case "id":
      return index + 1;
    case "uuid":
      return randomUuid();
    case "email": {
      const first = pick(FIRST_NAMES).toLowerCase();
      const last = pick(LAST_NAMES).toLowerCase();
      return `${first}.${last}${randomInt(1, 99)}@${pick(DOMAINS)}`;
    }
    case "name":
      return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    case "firstName":
      return pick(FIRST_NAMES);
    case "lastName":
      return pick(LAST_NAMES);
    case "date":
      return randomDate(false);
    case "datetime":
      return randomDate(true);
    case "url":
      return `https://${pick(DOMAINS)}/users/${index + 1}`;
    case "phone":
      return `+1-${pad(randomInt(200, 999))}-${pad(randomInt(200, 999))}-${pad(randomInt(1000, 9999))}`;
    case "color":
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
    case "lorem":
      return randomLorem();
    default:
      return null;
  }
}

function generateJson(fields: Field[], count: number): unknown[] {
  const validFields = fields.filter((f) => f.key.trim());
  return Array.from({ length: count }, (_, i) => {
    const obj: Record<string, unknown> = {};
    for (const field of validFields) {
      obj[field.key.trim()] = generateValue(field.type, i);
    }
    return obj;
  });
}

let nextId = 5;

export default function JsonGenerator() {
  const [fields, setFields] = useState<Field[]>(DEFAULT_FIELDS);
  const [count, setCount] = useState(5);
  const [pretty, setPretty] = useState(true);
  const [revision, setRevision] = useState(0);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const data = generateJson(fields, count);
    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
    // revision forces a new random sample
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, count, pretty, revision]);

  const updateField = (id: string, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const addField = () => {
    const id = String(nextId++);
    setFields((prev) => [...prev, { id, key: `field${prev.length + 1}`, type: "string" }]);
  };

  const removeField = (id: string) => {
    setFields((prev) => (prev.length <= 1 ? prev : prev.filter((f) => f.id !== id)));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <ToolPanel title="Schema">
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={field.key}
                onChange={(e) => updateField(field.id, { key: e.target.value })}
                placeholder="key"
                className={`${fieldClass} min-w-[8rem] flex-1 font-mono`}
                aria-label="Field key"
              />
              <select
                value={field.type}
                onChange={(e) =>
                  updateField(field.id, { type: e.target.value as FieldType })
                }
                className={`${fieldClass} w-44 shrink-0`}
                aria-label="Field type"
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeField(field.id)}
                disabled={fields.length <= 1}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                aria-label={`Remove ${field.key}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addField}
          className="mt-4 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Add field
        </button>
      </ToolPanel>

      <ToolPanel title="Options">
        <label
          htmlFor="json-count"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {count} object{count === 1 ? "" : "s"}
        </label>
        <input
          id="json-count"
          type="range"
          min={1}
          max={50}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mb-2 w-full accent-indigo-600"
        />
        <div className="mb-5 flex justify-between text-xs text-zinc-400">
          <span>1</span>
          <span>50</span>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={pretty}
            onChange={(e) => setPretty(e.target.checked)}
            className="rounded border-zinc-300 accent-indigo-600"
          />
          Pretty print
        </label>
      </ToolPanel>

      <ToolPanel title="Generated JSON">
        <pre className="max-h-[28rem] overflow-auto rounded-lg bg-zinc-50 p-4 font-mono text-sm dark:bg-zinc-800">
          {output}
        </pre>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setRevision((n) => n + 1);
              setCopied(false);
            }}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={copy}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </ToolPanel>
    </div>
  );
}
