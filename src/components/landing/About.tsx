"use client";

import { useState } from "react";
import { HeartHandshake, ShieldCheck, Target } from "lucide-react";
import PreviewableImage from "@/components/ui/PreviewableImage";

const VALUES = [
  {
    icon: Target,
    title: "Visi",
    text: "Membentuk peserta didik menjadi pribadi yang beriman, bertakwa, cerdas, berakhlak mulia, serta memiliki wawasan dan pengamalan Islam yang baik.",
  },
  {
    icon: HeartHandshake,
    title: "Misi",
    list: [
      "Menyelenggarakan kegiatan pembelajaran Al-Qur'an, Hadis, Fikih, Akidah, dan Akhlak secara terstruktur dan komprehensif.",
      "Membiasakan peserta didik dengan amalan ibadah harian, seperti salat berjamaah dan tadarus Al-Qur'an.",
      "Menanamkan nilai-nilai moral, keagamaan, dan budaya Islam melalui keteladanan.",
      "Mengembangkan kurikulum yang relevan untuk memperkuat pemahaman dan pengamalan ajaran Islam.",
      "Meningkatkan kompetensi para pengajar atau ustaz agar mampu memberikan pendidikan berkualitas.",
      "Menciptakan lingkungan belajar yang kondusif, menyenangkan, dan berlandaskan nilai-nilai Islami.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Nilai",
    text: "Adab sebelum ilmu, istiqamah dalam belajar, kejujuran, tanggung jawab, serta saling menghormati antara santri, ustaz, dan masyarakat.",
  },
];

// Cara pakai: taruh foto di /public/about/madrasah.jpg (foto gedung,
// halaman, atau kegiatan belajar). Kalau file belum ada, otomatis
// kembali ke motif geometris seperti sekarang.
function AboutPhoto() {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="w-full h-full min-h-[260px] bg-madin-navy rounded-xl2 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-24 h-24 opacity-15" fill="none">
          <path
            d="M100 10 L118 82 L190 100 L118 118 L100 190 L82 118 L10 100 L82 82 Z"
            stroke="white"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  return (
    <PreviewableImage
      src="/about/madrasah.jpg"
      alt="Suasana Madrasah Diniyah"
      onError={() => setBroken(true)}
      className="w-full h-full min-h-[260px] object-cover rounded-xl2"
      previewClassName="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
    />
  );
}

export default function About() {
  return (
    <section id="tentang" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
              Tentang Madrasah
            </p>
            <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3">
              Tempat belajar agama yang tertib dan bersahabat
            </h2>
            <p className="text-black/60 text-[15px] leading-relaxed mt-4">
              “Menumbuhkan Semangat Belajar Agama Sejak Dini : Membangun fondasi
              semangat belajar agama Islam yang kuat sejak usia dini melalui
              suasana belajar yang menyenangkan dan penuh makna”
            </p>
          </div>

          <AboutPhoto />
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

              {v.list ? (
                <ul className="mt-3 space-y-2 text-sm text-black/60 list-disc pl-5">
                  {v.list.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-black/55 text-sm leading-relaxed mt-2">
                  {v.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
