import Topbar from "@/components/dashboard/Topbar";
import { announcements } from "@/lib/dummy-data";
import { Plus, Megaphone } from "lucide-react";

export default function PengumumanPage() {
  return (
    <>
      <Topbar title="Pengumuman" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{announcements.length} pengumuman aktif</p>
          <button className="flex items-center gap-2 bg-madin-orange text-madin-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors">
            <Plus className="w-4 h-4" /> Buat Pengumuman
          </button>
        </div>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white rounded-xl2 border border-madin-line p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-madin-orange/10 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-madin-orangeDark" />
              </div>
              <div>
                <p className="font-medium text-madin-navy">{a.judul}</p>
                <p className="text-sm text-black/50 mt-1">{a.isi}</p>
                <p className="text-xs text-madin-teal mt-2">{a.tanggal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
