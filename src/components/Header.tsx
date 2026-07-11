import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import ToolSearch from "@/components/ToolSearch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            T
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-zinc-900 sm:inline dark:text-zinc-50">
            ToolBox
          </span>
        </Link>
        <div className="min-w-0 flex-1">
          <ToolSearch />
        </div>
        <HeaderNav />
      </div>
    </header>
  );
}
