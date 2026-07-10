import { HeartHandshake, ShieldCheck, Target } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Visi",
    text: "Menjadi madrasah diniyah rujukan dalam mencetak santri yang mendalami ilmu agama dengan akhlak yang lurus.",
  },
  {
    icon: HeartHandshake,
    title: "Misi",
    text: "Membina santri membaca dan memahami Al-Qur'an, menanamkan akhlak, serta membimbing praktik ibadah sehari-hari.",
  },
  {
    icon: ShieldCheck,
    title: "Nilai",
    text: "Adab sebelum ilmu, konsisten dalam belajar, dan lingkungan yang saling menjaga antar santri dan pengajar.",
  },
];

export default function About() {
  return (
    <section id="tentang" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
            Tentang Madrasah
          </p>
          <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3">
            Tempat belajar agama yang tertib dan bersahabat
          </h2>
          <p className="text-black/60 text-[15px] leading-relaxed mt-4">
            Madrasah Diniyah Takmiliyah hadir sebagai pelengkap pendidikan formal,
            memberi ruang bagi anak-anak untuk mempelajari ilmu agama secara
            bertahap dan mendalam di sore hari, tanpa mengurangi waktu belajar
            mereka di sekolah umum.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-xl2 border border-madin-line p-6"
            >
              <div className="w-11 h-11 rounded-lg bg-madin-teal/10 flex items-center justify-center">
                <v.icon className="w-5 h-5 text-madin-teal" />
              </div>
              <h3 className="font-display font-semibold text-madin-navy mt-4">
                {v.title}
              </h3>
              <p className="text-black/55 text-sm leading-relaxed mt-2">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
