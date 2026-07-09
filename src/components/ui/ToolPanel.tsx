interface ToolPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ToolPanel({
  title,
  children,
  className = "",
}: ToolPanelProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
