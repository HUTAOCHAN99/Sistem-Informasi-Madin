export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DeleteButton from "@/components/dashboard/DeleteButton";
import AddPanel from "@/components/dashboard/AddPanel";
import AddAnnouncementForm from "@/components/dashboard/forms/AddAnnouncementForm";
import { getAnnouncements } from "@/lib/data/announcements";
import { deleteAnnouncement } from "@/lib/actions/announcements";
import { Megaphone } from "lucide-react";

export default async function PengumumanPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <Topbar title="Pengumuman" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{announcements.length} pengumuman aktif</p>
          <AddPanel label="Buat Pengumuman">
            <AddAnnouncementForm />
          </AddPanel>
        </div>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl2 border border-madin-line p-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-madin-orange/10 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-madin-orangeDark" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-madin-navy">{a.judul}</p>
                <p className="text-sm text-black/50 mt-1">{a.isi}</p>
                <p className="text-xs text-madin-teal mt-2">{a.tanggal}</p>
              </div>
              <DeleteButton
                action={deleteAnnouncement.bind(null, a.id)}
                confirmText={`Hapus pengumuman "${a.judul}"?`}
              />
            </div>
          ))}
          {announcements.length === 0 && (
            <p className="text-sm text-black/40">Belum ada pengumuman.</p>
          )}
        </div>
      </div>
    </>
  );
}
