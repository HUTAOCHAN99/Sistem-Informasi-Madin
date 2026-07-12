"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#jenjang", label: "Jenjang" },
  { href: "#program", label: "Program" },
  { href: "#jadwal", label: "Jadwal" },
  { href: "#pengumuman", label: "Pengumuman" },
  { href: "#galeri", label: "Galeri" },
  { href: "#guru", label: "Guru" },
  { href: "#lokasi", label: "Lokasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-madin-navy/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/icon.png"
            alt="Madin icon"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-display font-semibold text-white text-[15px] leading-tight">
            Madrasah Diniyah
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/dashboard"
            className="bg-madin-orange text-madin-navy font-display font-semibold text-sm px-4 py-2 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors"
          >
            Masuk
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white"
          aria-label="Buka menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-madin-navy border-t border-white/10 px-5 py-4 space-y-3.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-white/80"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="block text-center mt-2 bg-madin-orange text-madin-navy font-display font-semibold text-sm px-4 py-2.5 rounded-lg"
          >
             Masuk
          </Link>
        </div>
      )}
    </header>
  );
}
