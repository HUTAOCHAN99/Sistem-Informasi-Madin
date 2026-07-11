import { createGrade } from "@/lib/actions/grades";
import type { SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddGradeForm({ studentOptions }: { studentOptions: SelectOption[] }) {
  return (
    <form action={createGrade} className="grid sm:grid-cols-3 gap-4">
      <div>
        <label className={label}>Santri</label>
        <select name="siswa_id" required defaultValue="" className={input}>
          <option value="" disabled>
            Pilih santri
          </option>
          {studentOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Mata Pelajaran</label>
        <input name="mapel" required placeholder="Al-Qur'an" className={input} />
      </div>
      <div />
      <div>
        <label className={label}>Harian</label>
        <input name="harian" type="number" min={0} max={100} defaultValue={0} className={input} />
      </div>
      <div>
        <label className={label}>UTS</label>
        <input name="uts" type="number" min={0} max={100} defaultValue={0} className={input} />
      </div>
      <div>
        <label className={label}>UAS</label>
        <input name="uas" type="number" min={0} max={100} defaultValue={0} className={input} />
      </div>
      <div className="sm:col-span-3">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Nilai
        </button>
      </div>
    </form>
  );
}
