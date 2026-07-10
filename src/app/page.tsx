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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <EducationLevels />
      <Programs />
      <Schedule />
      <Announcements />
      <Gallery />
      <Teachers />
      <Location />
      <Footer />
    </main>
  );
}
