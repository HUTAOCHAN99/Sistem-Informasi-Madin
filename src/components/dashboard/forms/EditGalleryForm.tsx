"use client";

import { useState } from "react";
import { updateGalleryItem } from "@/lib/actions/gallery";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import PreviewableImage from "@/components/ui/PreviewableImage";
import type { GalleryItem } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditGalleryForm({ item }: { item: GalleryItem }) {
  const onDone = useCloseEditModal();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        setPending(true);
        try {
          await updateGalleryItem(item.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui foto galeri.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-2 gap-4"
    >
      <div className="sm:col-span-2 flex items-center gap-3">
        <PreviewableImage
          src={item.foto_url}
          alt={item.caption || "Foto galeri"}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
          previewClassName="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
        />
        <p className="text-xs text-black/40">Klik foto untuk melihat ukuran penuh.</p>
      </div>

      <div>
        <label className={label}>Keterangan</label>
        <input name="caption" defaultValue={item.caption} className={input} />
      </div>
      <div>
        <label className={label}>Urutan (angka kecil tampil dulu)</label>
        <input name="urutan" type="number" defaultValue={item.urutan} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Ganti Foto (opsional, JPG/PNG/WEBP, maks 2MB)</label>
        <input
          type="file"
          name="foto"
          accept="image/png, image/jpeg, image/webp"
          className={`${input} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-madin-teal/10 file:text-madin-teal file:text-xs file:font-medium file:cursor-pointer cursor-pointer`}
        />
      </div>

      {error && <p className="sm:col-span-2 text-red-600 text-xs">{error}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
        >
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
