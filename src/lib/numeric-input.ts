/** Strip to a decimal number string: optional leading -, digits, one `.`. */
export function sanitizeDecimal(value: string): string {
  let v = value.replace(/[^\d.-]/g, "");
  const neg = v.startsWith("-");
  v = v.replace(/-/g, "");
  const dot = v.indexOf(".");
  if (dot !== -1) {
    v = v.slice(0, dot + 1) + v.slice(dot + 1).replace(/\./g, "");
  }
  return (neg ? "-" : "") + v;
}

/** Digits only, optional leading `-`. */
export function sanitizeInteger(value: string): string {
  let v = value.replace(/[^\d-]/g, "");
  const neg = v.startsWith("-");
  v = v.replace(/-/g, "");
  return (neg ? "-" : "") + v;
}

/** Non-negative integers only. */
export function sanitizeUnsignedInteger(value: string): string {
  return value.replace(/\D/g, "");
}

/** Integer lists: digits, commas, spaces, semicolons (for GCF/LCM). */
export function sanitizeIntegerList(value: string): string {
  return value.replace(/[^\d,\s;]/g, "");
}

/** Time as h:mm / HH:MM — digits and one colon. */
export function sanitizeTimeInput(value: string): string {
  const cleaned = value.replace(/[^\d:]/g, "");
  const colon = cleaned.indexOf(":");
  if (colon === -1) return cleaned.slice(0, 4);
  const hours = cleaned.slice(0, colon).slice(0, 2);
  const minutes = cleaned.slice(colon + 1).replace(/:/g, "").slice(0, 2);
  return `${hours}:${minutes}`;
}

/** Hex color typing: optional `#` + up to 6 hex digits. */
export function sanitizeHexColor(value: string): string {
  const hasHash = value.trimStart().startsWith("#");
  const hex = value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
  return hasHash || value.includes("#") ? `#${hex}` : hex;
}

/** Digits valid for a given radix (2–36), plus optional spaces. */
export function sanitizeRadixDigits(value: string, radix: number): string {
  if (radix < 2 || radix > 36) return value;
  const max = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, radix);
  const re = new RegExp(`[^${max}\\s]`, "gi");
  return value.replace(re, "");
}
