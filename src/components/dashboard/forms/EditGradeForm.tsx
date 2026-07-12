"use client";

import { useState } from "react";
import { updateGrade } from "@/lib/actions/grades";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import type { GradeRow, SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditGradeForm({
  grade,
  studentOptions,
}: {
  grade: GradeRow;
  studentOptions: SelectOption[];
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
          await updateGrade(grade.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui nilai.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-3 gap-4"
    >
      <div>
        <label className={label}>Santri</label>
        <select name="siswa_id" required defaultValue={grade.siswa_id} className={input}>
          {studentOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Mata Pelajaran</label>
        <input name="mapel" required defaultValue={grade.mapel} className={input} />
      </div>
      <div />
      <div>
        <label className={label}>Harian</label>
        <input name="harian" type="number" min={0} max={100} defaultValue={grade.harian} className={input} />
      </div>
      <div>
        <label className={label}>UTS</label>
        <input name="uts" type="number" min={0} max={100} defaultValue={grade.uts} className={input} />
      </div>
      <div>
        <label className={label}>UAS</label>
        <input name="uas" type="number" min={0} max={100} defaultValue={grade.uas} className={input} />
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
