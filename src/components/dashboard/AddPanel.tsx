"use client";

import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";

export default function AddPanel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-madin-orange text-madin-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors"
      >
        {open ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {open ? "Tutup" : label}
      </button>

      {open && (
        <div
          ref={formWrapperRef}
          className="mt-4 bg-white rounded-xl2 border border-madin-line p-5"
          onSubmitCapture={() => {
            // Form di dalam akan menutup panel setelah submit berhasil
            // (halaman ter-revalidate lewat server action, jadi cukup
            // tutup UI-nya di sini).
            setOpen(false);
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
