// Service worker minimal, cuma buat memenuhi syarat "installable" di Chrome/Android
// (butuh SW yang punya fetch handler terdaftar) — TIDAK melakukan caching agresif,
// supaya data dashboard/login yang dinamis tetap selalu fresh dari server.
const CACHE_NAME = "madin-shell-v1";
const APP_SHELL = ["/", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first: selalu coba ambil dari server dulu. Kalau offline (tidak ada
// koneksi sama sekali), baru fallback ke shell yang di-cache — supaya user
// setidaknya lihat halaman utama, bukan error blank putih.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((cached) => cached || caches.match("/"))
    )
  );
});
