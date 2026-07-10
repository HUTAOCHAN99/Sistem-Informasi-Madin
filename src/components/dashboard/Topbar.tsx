import { Bell, Search } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-madin-line">
      <div>
        <h1 className="font-display text-lg font-semibold text-madin-navy">{title}</h1>
        <p className="text-xs text-black/40">Data ditampilkan sementara masih dummy</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-madin-cream border border-madin-line rounded-lg px-3 py-2 w-56">
          <Search className="w-4 h-4 text-black/30" />
          <input
            placeholder="Cari..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-black/30"
          />
        </div>
        <button className="relative w-9 h-9 rounded-lg border border-madin-line flex items-center justify-center hover:bg-madin-cream">
          <Bell className="w-4 h-4 text-madin-navy" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-madin-orange" />
        </button>
        <div className="w-9 h-9 rounded-full bg-madin-orange/20 flex items-center justify-center text-madin-orangeDark text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
