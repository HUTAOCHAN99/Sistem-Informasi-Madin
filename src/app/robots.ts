import type { MetadataRoute } from "next";

const BASE_URL = "https://madin-nurul-huda-kebondalem.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Halaman dashboard & login tidak perlu diindex Google
        disallow: ["/dashboard", "/dashboard/", "/login", "/api"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
