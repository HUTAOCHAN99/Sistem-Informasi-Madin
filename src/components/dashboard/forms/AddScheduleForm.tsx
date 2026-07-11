import { createSchedule } from "@/lib/actions/schedule";
import type { SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";
const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function AddScheduleForm({
  teacherOptions,
  classOptions,
}: {
  teacherOptions: SelectOption[];
  classOptions: SelectOption[];
}) {
  return (
    <form action={createSchedule} className="grid sm:grid-cols-3 gap-4">
      <div>
        <label className={label}>Hari</label>
        <select name="hari" required defaultValue="" className={input}>
          <option value="" disabled>
            Pilih hari
          </option>
          {HARI.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Jam</label>
        <input name="jam" required placeholder="16.00 - 16.45" className={input} />
      </div>
      <div>
        <label className={label}>Mata Pelajaran</label>
        <input name="mapel" required placeholder="Fiqih" className={input} />
      </div>
      <div>
        <label className={label}>Guru</label>
        <select name="guru_id" defaultValue="" className={input}>
          <option value="">Belum ditentukan</option>
          {teacherOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Kelas</label>
        <select name="kelas_id" defaultValue="" className={input}>
          <option value="">Belum ditentukan</option>
          {classOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-3">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Jadwal
        </button>
      </div>
    </form>
  );
}
