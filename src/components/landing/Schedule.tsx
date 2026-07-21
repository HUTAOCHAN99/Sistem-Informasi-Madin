"use client";

import { useMemo, useRef, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Clock, GraduationCap, Users } from "lucide-react";
import type { Hari, ScheduleItem } from "@/lib/types";

const HARI_ORDER: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

type DayGroup = {
  hari: Hari;
  items: ScheduleItem[];
};

export default function Schedule({ schedule }: { schedule: ScheduleItem[] }) {
  const days = useMemo<DayGroup[]>(() => {
    return HARI_ORDER.map((hari) => ({
      hari,
      items: schedule.filter((s) => s.hari === hari),
    })).filter((d) => d.items.length > 0);
  }, [schedule]);

  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, days.length - 1));
    setActive(clamped);
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  // Update dot aktif saat user swipe manual (scroll) di track carousel.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).getBoundingClientRect().left - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  };

  return (
    <section id="jadwal" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
              Jadwal Belajar
            </p>
          </div>
        </div>

        {days.length === 0 ? (
          <div className="bg-white rounded-xl2 border border-madin-line mt-10 p-6">
            <p className="text-sm text-black/40">Jadwal belum tersedia.</p>
          </div>
        ) : (
          <div className="mt-10">
            {/* Track carousel */}
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {days.map((day) => (
                <div
                  key={day.hari}
                  className="snap-start shrink-0 w-[85%] sm:w-[420px] bg-white rounded-xl2 border border-madin-line overflow-hidden flex flex-col"
                >
                  {/* Header hari, ditulis satu kali per card */}
                  <div className="bg-madin-navy px-5 py-4 flex items-center justify-between">
                    <h3 className="font-display font-bold text-white text-lg">{day.hari}</h3>
                    <span className="text-white/70 text-xs font-medium">
                      {day.items.length} kelas
                    </span>
                  </div>

                  {/* Daftar jadwal dalam hari tsb */}
                  <div className="divide-y divide-madin-line">
                    {day.items.map((s) => (
                      <div key={s.id} className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-madin-orange text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{s.jam}</span>
                        </div>
                        <p className="mt-1.5 font-semibold text-madin-navy text-sm flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-madin-teal shrink-0" />
                          {s.mapel}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/60">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 shrink-0" />
                            {s.kelas}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                            {s.guru}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Kontrol navigasi + dot indikator */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-1.5">
                {days.map((day, i) => (
                  <button
                    key={day.hari}
                    type="button"
                    aria-label={`Lihat jadwal ${day.hari}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-6 bg-madin-teal" : "w-1.5 bg-madin-line"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Hari sebelumnya"
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                  className="w-9 h-9 rounded-full border border-madin-line flex items-center justify-center text-madin-navy disabled:opacity-30 hover:bg-madin-cream transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Hari berikutnya"
                  onClick={() => goTo(active + 1)}
                  disabled={active === days.length - 1}
                  className="w-9 h-9 rounded-full border border-madin-line flex items-center justify-center text-madin-navy disabled:opacity-30 hover:bg-madin-cream transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
