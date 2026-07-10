import { teachers } from "@/lib/dummy-data";

function initials(name: string) {
  const parts = name.replace(/^(Ust\.|Usth\.)\s*/i, "").split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function Teachers() {
  return (
    <section id="guru" className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Tenaga Pengajar
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Diampu oleh ustadz dan ustadzah berpengalaman
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="rounded-xl2 border border-madin-line p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-madin-teal/10 text-madin-teal font-display font-semibold flex items-center justify-center mx-auto">
                {initials(t.nama)}
              </div>
              <h3 className="font-display font-semibold text-madin-navy text-sm mt-4">
                {t.nama}
              </h3>
              <p className="text-madin-orange text-xs font-medium mt-1">
                {t.mapel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
