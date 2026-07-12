"use client";

import { Pencil, X } from "lucide-react";
import { createContext, useContext, useState } from "react";

/**
 * Dipakai oleh Edit*Form (client component) untuk menutup modal setelah
 * berhasil menyimpan, tanpa perlu prop `onDone` yang dikirim lewat
 * render-prop dari Server Component (yang tidak diperbolehkan React, karena
 * function bukan nilai yang bisa diserialisasi lintas batas server/client).
 */
const CloseModalContext = createContext<() => void>(() => {});

export function useCloseEditModal() {
  return useContext(CloseModalContext);
}

/**
 * Tombol pensil yang membuka modal berisi form edit. Dipakai bersamaan
 * dengan DeleteButton di kolom "Aksi" tiap tabel dashboard.
 *
 * `children` adalah elemen React biasa (mis. <EditStudentForm .../>), boleh
 * dirender langsung dari Server Component seperti page.tsx — yang penting
 * bukan function/render-prop. Form di dalamnya memanggil
 * `useCloseEditModal()` untuk menutup modal sendiri setelah sukses.
 */
export default function EditModal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Edit"
        title="Edit"
        className="p-1.5 rounded-lg text-black/40 hover:text-madin-teal hover:bg-madin-teal/10 transition-colors"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={close}
        >
          <div
            className="bg-white rounded-xl2 border border-madin-line p-5 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-madin-navy">{title}</h3>
              <button
                onClick={close}
                aria-label="Tutup"
                className="p-1 rounded-lg text-black/40 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <CloseModalContext.Provider value={close}>{children}</CloseModalContext.Provider>
          </div>
        </div>
      )}
    </>
  );
}
