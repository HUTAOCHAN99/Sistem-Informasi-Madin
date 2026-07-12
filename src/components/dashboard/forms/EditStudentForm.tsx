"use client";

import { useState } from "react";
import { updateStudent } from "@/lib/actions/students";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import type { SelectOption, Student } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditStudentForm({
  student,
  classOptions,
}: {
  student: Student;
  classOptions: SelectOption[];
}) {
  const onDone = useCloseEditModal();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        setPending(true);
        try {
          await updateStudent(student.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui santri.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-3 gap-4"
    >
      <div>
        <label className={label}>Nama</label>
        <input name="nama" required defaultValue={student.nama} className={input} />
      </div>
      <div>
        <label className={label}>NIS</label>
        <input name="nis" required defaultValue={student.nis} className={input} />
      </div>
      <div>
        <label className={label}>Jenis Kelamin</label>
        <select name="jenis_kelamin" required defaultValue={student.jenis_kelamin} className={input}>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>
      <div>
        <label className={label}>Kelas</label>
        <select name="kelas_id" defaultValue={student.kelas_id ?? ""} className={input}>
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
        <input name="orang_tua" defaultValue={student.orang_tua} className={input} />
      </div>
      <div>
        <label className={label}>No HP</label>
        <input name="hp" defaultValue={student.hp} className={input} />
      </div>

      {error && <p className="sm:col-span-3 text-red-600 text-xs">{error}</p>}

      <div className="sm:col-span-3">
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
