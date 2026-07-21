const LEVELS = [
  {
    step: "Tahap 1",
    name: "Awaliyah",
    duration: "Kelas 1 - 4",
    desc: "Pengenalan huruf hijaiyah, dasar membaca Al-Qur'an (Yanbu'a),doa-doa, dan adab dasar sehari-hari.",
  },
  {
    step: "Tahap 2",
    name: "Wustha",
    duration: "Kelas 5 - 7",
    desc: "Kelancaran membaca Al-Qur'an, dasar fiqih ibadah, dan kajian kitab dasar.",
  },
  {
    step: "Tahap 3",
    name: "Ulya",
    duration: "",
    desc: "Hafalan, kajian kitab lanjutan, dan pemahaman mendalam tentang tauhid dan fiqih.",
  },
];

export default function EducationLevels() {
  return (
    <section id="jenjang" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Jenjang Pendidikan
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Tiga tahap belajar, dari dasar hingga siap terjun ke masyarakat
        </h2>

        <div className="relative mt-14">
          <div className="hidden sm:block absolute top-[42px] left-[8%] right-[8%] h-px bg-madin-line" />
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
            {LEVELS.map((level, i) => (
              <div key={level.name} className="relative">
                <div className="hidden sm:flex w-3 h-3 rounded-full bg-madin-orange border-4 border-madin-cream absolute -top-[46px] left-1/2 -translate-x-1/2 z-10" />
                <div className="bg-white rounded-xl2 border border-madin-line p-6 h-full">
                  <p className="text-madin-orange text-xs font-semibold tracking-wide uppercase">
                    {level.step}
                  </p>
                  <h3 className="font-display font-bold text-madin-navy text-xl mt-2">
                    {level.name}
                  </h3>
                  <p className="text-black/45 text-xs font-medium mt-0.5">
                    {level.duration}
                  </p>
                  <p className="text-black/60 text-sm leading-relaxed mt-3">
                    {level.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
