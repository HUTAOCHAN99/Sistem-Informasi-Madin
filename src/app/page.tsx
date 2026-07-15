export const dynamic = "force-dynamic";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Stats from "@/components/landing/Stats";
import EducationLevels from "@/components/landing/EducationLevels";
import Programs from "@/components/landing/Programs";
import Schedule from "@/components/landing/Schedule";
import Announcements from "@/components/landing/Announcements";
import Gallery from "@/components/landing/Gallery";
import Teachers from "@/components/landing/Teachers";
import Location from "@/components/landing/Location";
import Footer from "@/components/landing/Footer";
import FadeInSection from "@/components/landing/FadeInSection";
import { getDashboardStats } from "@/lib/data/stats";
import { getAnnouncements } from "@/lib/data/announcements";
import { getSchedule } from "@/lib/data/schedule";
import { getTeachers } from "@/lib/data/teachers";
import { getGalleryItems } from "@/lib/data/gallery";
import { isSupabaseConfigured } from "@/lib/supabase/server";

// Kalau env Supabase belum diisi, tampilkan halaman tetap jalan dengan data
// kosong (bukan crash) — supaya halaman publik tidak ikut error kalau baru
// setup project.
async function safeLoad() {
  if (!isSupabaseConfigured()) {
    return {
      stats: { totalGuru: 0, totalSantri: 0, totalKelas: 0, pengumumanAktif: 0, jadwalHariIni: 0 },
      announcements: [],
      schedule: [],
      teachers: [],
      gallery: [],
    };
  }

  const [stats, announcements, schedule, teachers, gallery] = await Promise.all([
    getDashboardStats(),
    getAnnouncements(),
    getSchedule(),
    getTeachers(),
    getGalleryItems(),
  ]);

  return { stats, announcements, schedule, teachers, gallery };
}

export default async function Home() {
  const { stats, announcements, schedule, teachers, gallery } = await safeLoad();

  return (
    <main className="min-h-screen">
      <Navbar />
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <About />
      </FadeInSection>
      <FadeInSection>
        <Stats stats={stats} />
      </FadeInSection>
      <FadeInSection>
        <EducationLevels />
      </FadeInSection>
      <FadeInSection>
        <Programs />
      </FadeInSection>
      <FadeInSection>
        <Schedule schedule={schedule} />
      </FadeInSection>
      <FadeInSection>
        <Announcements announcements={announcements.slice(0, 3)} />
      </FadeInSection>
      <FadeInSection>
        <Gallery items={gallery} />
      </FadeInSection>
      <FadeInSection>
        <Teachers teachers={teachers} />
      </FadeInSection>
      <FadeInSection>
        <Location />
      </FadeInSection>
      <Footer />
    </main>
  );
}
