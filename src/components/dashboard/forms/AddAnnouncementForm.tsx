import { createAnnouncement } from "@/lib/actions/announcements";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddAnnouncementForm() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={createAnnouncement} className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className={label}>Judul</label>
        <input name="judul" required placeholder="Judul pengumuman" className={input} />
      </div>
      <div>
        <label className={label}>Tanggal</label>
        <input name="tanggal" type="date" defaultValue={today} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Isi</label>
        <textarea name="isi" rows={3} placeholder="Isi pengumuman..." className={input} />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Terbitkan Pengumuman
        </button>
      </div>
    </form>
  );
}
