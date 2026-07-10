"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#program", label: "Jenjang" },
  { href: "#peran", label: "Untuk Siapa" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-madin-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#beranda" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-madin-orange flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </span>
            <span className="font-display font-bold text-lg text-madin-navy">
              Madin<span className="text-madin-orange">.</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-madin-navy/70 hover:text-madin-orange transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 bg-madin-navy text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-madin-orange transition-colors"
            >
              Masuk Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-madin-navy"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-madin-line bg-white px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-madin-navy/80"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="block text-center bg-madin-navy text-white text-sm font-medium px-4 py-2.5 rounded-lg"
          >
            Masuk Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
