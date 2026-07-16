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
    "Profil dan sistem informasi Madrasah Diniyah Takmiliyah Nurul Huda Kebondalem.",

  applicationName: "Madrasah Diniyah Nurul Huda",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Madrasah Diniyah Nurul Huda Kebondalem",
    description:
      "Profil dan sistem informasi Madrasah Diniyah Takmiliyah Nurul Huda Kebondalem.",
    url: BASE_URL,
    siteName: "Madrasah Diniyah Nurul Huda",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Madrasah Diniyah Nurul Huda Kebondalem",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
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
