"use client";

import { useState } from "react";
import { updateClass } from "@/lib/actions/classes";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import type { SelectOption, StudentClass } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditClassForm({
  studentClass,
  teacherOptions,
}: {
  studentClass: StudentClass;
  teacherOptions: SelectOption[];
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
          await updateClass(studentClass.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui kelas.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-3 gap-4"
    >
      <div>
        <label className={label}>Nama Kelas</label>
        <input name="nama_kelas" required defaultValue={studentClass.nama_kelas} className={input} />
      </div>
      <div>
        <label className={label}>Jenjang</label>
        <select name="jenjang" required defaultValue={studentClass.jenjang} className={input}>
          <option value="Awaliyah">Awaliyah</option>
          <option value="Wustha">Wustha</option>
          <option value="Ulya">Ulya</option>
        </select>
      </div>
      <div>
        <label className={label}>Wali Kelas</label>
        <select name="wali_kelas_id" defaultValue={studentClass.wali_kelas_id ?? ""} className={input}>
          <option value="">Belum ditentukan</option>
          {teacherOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
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
