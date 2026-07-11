import { createClass } from "@/lib/actions/classes";
import type { SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddClassForm({ teacherOptions }: { teacherOptions: SelectOption[] }) {
  return (
    <form action={createClass} className="grid sm:grid-cols-3 gap-4">
      <div>
        <label className={label}>Nama Kelas</label>
        <input name="nama_kelas" required placeholder="Awaliyah 3" className={input} />
      </div>
      <div>
        <label className={label}>Jenjang</label>
        <select name="jenjang" required defaultValue="" className={input}>
          <option value="" disabled>
            Pilih jenjang
          </option>
          <option value="Awaliyah">Awaliyah</option>
          <option value="Wustha">Wustha</option>
          <option value="Ulya">Ulya</option>
        </select>
      </div>
      <div>
        <label className={label}>Wali Kelas</label>
        <select name="wali_kelas_id" defaultValue="" className={input}>
          <option value="">Belum ditentukan</option>
          {teacherOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-3">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Kelas
        </button>
      </div>
    </form>
  );
}
