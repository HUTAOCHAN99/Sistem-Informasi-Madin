import Topbar from "@/components/dashboard/Topbar";
import { classes } from "@/lib/dummy-data";

const jenjangList = ["Awaliyah", "Wustha", "Ulya"] as const;

export default function KelasPage() {
  return (
    <>
      <Topbar title="Data Kelas" />
      <div className="p-6 space-y-6">
        {jenjangList.map((jenjang) => {
          const items = classes.filter((c) => c.jenjang === jenjang);
          return (
            <div key={jenjang}>
              <h2 className="font-display font-semibold text-madin-navy mb-3">{jenjang}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl2 border border-madin-line p-5">
                    <p className="font-medium text-madin-navy">{c.nama_kelas}</p>
                    <p className="text-xs text-black/50 mt-1">Wali kelas: {c.wali_kelas}</p>
                    <p className="text-xs text-madin-teal mt-2">{c.jumlah_santri} santri</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
