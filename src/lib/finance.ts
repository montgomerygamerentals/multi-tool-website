export const financeInputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800";

export function formatUsd(n: number, digits = 2): string {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPct(n: number, digits = 2): string {
  return `${n.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;
}

export function parseAmount(value: string): number | null {
  const n = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** Standard amortizing loan payment (monthly). */
export function monthlyLoanPayment(
  principal: number,
  annualRatePct: number,
  termMonths: number,
): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / termMonths;
  const factor = Math.pow(1 + r, termMonths);
  return (principal * r * factor) / (factor - 1);
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function buildAmortizationSchedule(
  principal: number,
  annualRatePct: number,
  termMonths: number,
): AmortizationRow[] {
  const payment = monthlyLoanPayment(principal, annualRatePct, termMonths);
  const r = annualRatePct / 100 / 12;
  let balance = principal;
  const rows: AmortizationRow[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * r;
    let principalPaid = payment - interest;
    if (month === termMonths || principalPaid > balance) {
      principalPaid = balance;
    }
    const actualPayment = principalPaid + interest;
    balance = Math.max(0, balance - principalPaid);
    rows.push({
      month,
      payment: actualPayment,
      principal: principalPaid,
      interest,
      balance,
    });
    if (balance <= 0.005) break;
  }
  return rows;
}
