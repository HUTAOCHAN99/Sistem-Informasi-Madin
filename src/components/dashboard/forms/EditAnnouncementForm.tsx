"use client";

import { useState } from "react";
import { updateAnnouncement } from "@/lib/actions/announcements";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import type { Announcement } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditAnnouncementForm({ announcement }: { announcement: Announcement }) {
  const onDone = useCloseEditModal();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        setPending(true);
        try {
          await updateAnnouncement(announcement.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui pengumuman.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-2 gap-4"
    >
      <div>
        <label className={label}>Judul</label>
        <input name="judul" required defaultValue={announcement.judul} className={input} />
      </div>
      <div>
        <label className={label}>Tanggal</label>
        <input name="tanggal" type="date" defaultValue={announcement.tanggal} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Isi</label>
        <textarea name="isi" rows={3} defaultValue={announcement.isi} className={input} />
      </div>

      {error && <p className="sm:col-span-2 text-red-600 text-xs">{error}</p>}

      <div className="sm:col-span-2">
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
