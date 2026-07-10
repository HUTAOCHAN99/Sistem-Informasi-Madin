import { Megaphone } from "lucide-react";
import { announcements } from "@/lib/dummy-data";

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Announcements() {
  return (
    <section id="pengumuman" className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Pengumuman
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Informasi terbaru untuk santri dan wali santri
        </h2>

        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="rounded-xl2 border border-madin-line p-6 flex flex-col"
            >
              <div className="w-9 h-9 rounded-lg bg-madin-orange/10 flex items-center justify-center">
                <Megaphone className="w-4 h-4 text-madin-orange" />
              </div>
              <p className="text-black/40 text-xs font-medium mt-4">
                {formatTanggal(a.tanggal)}
              </p>
              <h3 className="font-display font-semibold text-madin-navy mt-1.5">
                {a.judul}
              </h3>
              <p className="text-black/55 text-sm leading-relaxed mt-2">{a.isi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
