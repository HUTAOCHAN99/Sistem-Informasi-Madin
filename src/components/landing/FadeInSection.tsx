"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  /** Jeda sebelum animasi mulai (ms), berguna untuk efek staggered antar section */
  delay?: number;
  className?: string;
};

/**
 * Membungkus sebuah section landing page supaya fade-in + sedikit slide-up
 * begitu section-nya masuk ke viewport saat halaman di-scroll.
 * Animasi hanya jalan sekali (tidak fade-out lagi saat discroll balik),
 * dan otomatis dilewati kalau user set "prefers-reduced-motion".
 */
export default function FadeInSection({ children, delay = 0, className = "" }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
