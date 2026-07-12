"use client";

import { useState } from "react";
import { updateTeacher } from "@/lib/actions/teachers";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import type { Teacher } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditTeacherForm({ teacher }: { teacher: Teacher }) {
  const onDone = useCloseEditModal();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        setPending(true);
        try {
          await updateTeacher(teacher.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui guru.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-3 gap-4"
    >
      <div>
        <label className={label}>Nama</label>
        <input name="nama" required defaultValue={teacher.nama} className={input} />
      </div>
      <div>
        <label className={label}>Mata Pelajaran</label>
        <input name="mapel" defaultValue={teacher.mapel} className={input} />
      </div>
      <div>
        <label className={label}>No HP</label>
        <input name="hp" defaultValue={teacher.hp} className={input} />
      </div>

      <p className="sm:col-span-3 text-xs text-black/40 -mt-1">
        Foto diubah lewat ikon kamera di tabel Data Guru, bukan di sini.
      </p>

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
