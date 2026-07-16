import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Madrasah Diniyah Nurul Huda Kebondalem",
    short_name: "Madin Nurul Huda",
    description:
      "Profil dan sistem informasi Madrasah Diniyah Takmiliyah Nurul Huda Kebondalem.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F7F5",
    theme_color: "#092A0E",
    lang: "id-ID",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
