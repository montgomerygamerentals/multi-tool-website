interface ToolPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  /** When set, shows a discrete Clear control in the top-right of the panel. */
  onClear?: () => void;
  clearLabel?: string;
}

export default function ToolPanel({
  title,
  children,
  className = "",
  onClear,
  clearLabel = "Clear",
}: ToolPanelProps) {
  const showHeader = Boolean(title || onClear);

  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {showHeader && (
        <div className="mb-4 flex items-start justify-between gap-3">
          {title ? (
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {title}
            </h2>
          ) : (
            <span />
          )}
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="shrink-0 cursor-pointer rounded-md px-2 py-0.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              {clearLabel}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
