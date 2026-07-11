/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Router Cache Next.js di browser default menyimpan halaman dynamic
  // (force-dynamic) selama ~30 detik sebelum dianggap basi. Ini bikin
  // landing page ("/") kadang masih nampilin data lama walau server-nya
  // sudah fresh (misal: baru tambah guru/pengumuman di dashboard, terus
  // klik balik ke landing page tanpa refresh manual).
  // staleTimes.dynamic = 0 mematikan cache itu khusus untuk halaman
  // dynamic, jadi setiap navigasi klik <Link> selalu refetch data baru
  // dari server. Halaman static tetap dicache seperti biasa.
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
};

module.exports = nextConfig;
