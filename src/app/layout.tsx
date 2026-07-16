import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const BASE_URL = "https://madin-nurul-huda-kebondalem.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Madrasah Diniyah Nurul Huda Kebondalem — Sistem Informasi",
    template: "%s | Madin Nurul Huda Kebondalem",
  },
  description:
    "Profil dan sistem informasi Madrasah Diniyah Takmiliyah Nurul Huda Kebondalem: profil, jadwal pengajian, guru, galeri kegiatan, dan pengumuman terbaru.",
  keywords: [
    "Madrasah Diniyah Nurul Huda",
    "Madin Kebondalem",
    "Madrasah Diniyah Takmiliyah",
    "sistem informasi madrasah",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Madrasah Diniyah Nurul Huda Kebondalem",
    description:
      "Profil dan sistem informasi Madrasah Diniyah Takmiliyah Nurul Huda Kebondalem.",
    url: BASE_URL,
    siteName: "Madin Nurul Huda Kebondalem",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Tempel kode dari Google Search Console (metode "HTML tag") di sini, contoh:
    // google: "abcXYZ123isiVerifikasiDariGoogle",
    google: undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${display.variable} ${body.variable} font-body bg-madin-cream text-madin-navy`}>
        {children}
      </body>
    </html>
  );
}
