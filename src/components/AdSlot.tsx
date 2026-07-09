interface AdSlotProps {
  position: "sidebar" | "banner" | "inline";
  className?: string;
}

const positionStyles: Record<AdSlotProps["position"], string> = {
  sidebar: "min-h-[250px] w-full max-w-[300px]",
  banner: "min-h-[90px] w-full",
  inline: "min-h-[120px] w-full",
};

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500 ${positionStyles[position]} ${className}`}
      aria-label="Advertisement"
    >
      Ad Space
    </div>
  );
}
