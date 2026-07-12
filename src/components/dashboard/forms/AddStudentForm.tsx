import { createStudent } from "@/lib/actions/students";
import type { SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddStudentForm({ classOptions }: { classOptions: SelectOption[] }) {
  return (
    <form action={createStudent} className="grid sm:grid-cols-3 gap-4">
      <div>
        <label className={label}>Nama</label>
        <input name="nama" required placeholder="Nama santri" className={input} />
      </div>
      <div>
        <label className={label}>NIS</label>
        <input name="nis" required placeholder="2026007" className={input} />
      </div>
      <div>
        <label className={label}>Jenis Kelamin</label>
        <select name="jenis_kelamin" required defaultValue="" className={input}>
          <option value="" disabled>
            Pilih
          </option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>
      <div>
        <label className={label}>Kelas</label>
        <select name="kelas_id" defaultValue="" className={input}>
          <option value="">Belum ada kelas</option>
          {classOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Orang Tua / Wali</label>
        <input name="orang_tua" placeholder="Bpk./Ibu ..." className={input} />
      </div>
      <div>
        <label className={label}>No HP</label>
        <input name="hp" placeholder="0812-0000-0000" className={input} />
      </div>
      <div className="sm:col-span-3">
        <label className={label}>Foto (opsional, JPG/PNG/WEBP, maks 2MB)</label>
        <input
          type="file"
          name="foto"
          accept="image/png, image/jpeg, image/webp"
          className={`${input} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-madin-teal/10 file:text-madin-teal file:text-xs file:font-medium file:cursor-pointer cursor-pointer`}
        />
      </div>
      <div className="sm:col-span-3">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Santri
        </button>
      </div>
    </form>
  );
}
