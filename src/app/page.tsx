import Topbar from "@/components/public/Topbar";
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import Features from "@/components/public/Features";
import About from "@/components/public/About";
import RoleShowcase from "@/components/public/RoleShowcase";
import StatsBand from "@/components/public/StatsBand";
import Programs from "@/components/public/Programs";
import CTA from "@/components/public/CTA";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Topbar />
      <Navbar />
      <Hero />
      <Features />
      <About />
      <RoleShowcase />
      <StatsBand />
      <Programs />
      <CTA />
      <Footer />
    </main>
  );
}
