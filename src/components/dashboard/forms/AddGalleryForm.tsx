import { createGalleryItem } from "@/lib/actions/gallery";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddGalleryForm() {
  return (
    <form action={createGalleryItem} className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className={label}>Keterangan</label>
        <input name="caption" placeholder="Kegiatan mengaji sore" className={input} />
      </div>
      <div>
        <label className={label}>Urutan (opsional, angka kecil tampil dulu)</label>
        <input name="urutan" type="number" defaultValue={0} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Foto (wajib, JPG/PNG/WEBP, maks 2MB)</label>
        <input
          type="file"
          name="foto"
          required
          accept="image/png, image/jpeg, image/webp"
          className={`${input} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-madin-teal/10 file:text-madin-teal file:text-xs file:font-medium file:cursor-pointer cursor-pointer`}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Foto
        </button>
      </div>
    </form>
  );
}
