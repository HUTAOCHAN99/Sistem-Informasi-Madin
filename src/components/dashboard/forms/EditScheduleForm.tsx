"use client";

import { useState } from "react";
import { updateSchedule } from "@/lib/actions/schedule";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import type { ScheduleItem, SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";
const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function EditScheduleForm({
  item,
  teacherOptions,
  classOptions,
}: {
  item: ScheduleItem;
  teacherOptions: SelectOption[];
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
          await updateSchedule(item.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui jadwal.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-3 gap-4"
    >
      <div>
        <label className={label}>Hari</label>
        <select name="hari" required defaultValue={item.hari} className={input}>
          {HARI.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Jam (opsional)</label>
        <input
          name="jam"
          placeholder="16.00 - 16.45"
          defaultValue={item.jam}
          className={input}
        />
      </div>
      <div>
        <label className={label}>Mata Pelajaran (opsional)</label>
        <input
          name="mapel"
          placeholder="Fiqih"
          defaultValue={item.mapel}
          className={input}
        />
      </div>
      <div>
        <label className={label}>Guru (opsional)</label>
        <select name="guru_id" defaultValue={item.guru_id ?? ""} className={input}>
          <option value="">Belum ditentukan</option>
          {teacherOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Kelas (opsional)</label>
        <select name="kelas_id" defaultValue={item.kelas_id ?? ""} className={input}>
          <option value="">Belum ditentukan</option>
          {classOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
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
