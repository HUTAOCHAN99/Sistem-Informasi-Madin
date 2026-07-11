import { createTeacher } from "@/lib/actions/teachers";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddTeacherForm() {
  return (
    <form action={createTeacher} className="grid sm:grid-cols-3 gap-4">
      <div>
        <label className={label}>Nama</label>
        <input name="nama" required placeholder="Ust. Contoh Nama" className={input} />
      </div>
      <div>
        <label className={label}>Mata Pelajaran</label>
        <input name="mapel" placeholder="Fiqih" className={input} />
      </div>
      <div>
        <label className={label}>No HP</label>
        <input name="hp" placeholder="0812-0000-0000" className={input} />
      </div>
      <div className="sm:col-span-3">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Guru
        </button>
      </div>
    </form>
  );
}
