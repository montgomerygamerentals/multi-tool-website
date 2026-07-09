interface AdSlotProps {
  className?: string;
}

export default function AdSlot({ className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex min-h-[90px] w-full items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500 ${className}`}
      aria-label="Advertisement"
    >
      Ad Space
    </div>
  );
}
