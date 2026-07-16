import ToolPanel from "@/components/ui/ToolPanel";

interface FinanceFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FinanceField({ label, children, className = "" }: FinanceFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

interface ResultHeroProps {
  label: string;
  value: string;
  hint?: string;
}

export function ResultHero({ label, value, hint }: ResultHeroProps) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/30">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
      {hint && <p className="mt-2 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

interface ResultStatProps {
  label: string;
  value: string;
}

export function ResultStat({ label, value }: ResultStatProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  );
}

interface FinanceDisclaimerProps {
  children: React.ReactNode;
}

export function FinanceDisclaimer({ children }: FinanceDisclaimerProps) {
  return (
    <p className="text-xs text-zinc-500 dark:text-zinc-400">{children}</p>
  );
}

export { ToolPanel };
