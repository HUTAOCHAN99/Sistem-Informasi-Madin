export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import EditSiteImageForm from "@/components/dashboard/forms/EditSiteImageForm";
import { getSiteSettings } from "@/lib/data/settings";

export default async function PengaturanPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Topbar title="Pengaturan Tampilan" />
      <div className="p-6 space-y-4 max-w-2xl">
        <p className="text-sm text-black/50">
          Ganti foto yang tampil di halaman beranda (landing page) untuk
          section Hero, Tentang, dan Lokasi. Kalau belum diganti, halaman
          beranda otomatis memakai foto bawaan.
        </p>

        <EditSiteImageForm
          imageKey="hero"
          title="Foto Hero"
          description="Tampil di bagian paling atas halaman beranda, di samping kutipan hadis."
          currentUrl={settings.hero_image_url}
          defaultHint="Memakai motif geometris bawaan (atau foto di /public/hero/madrasah.jpg kalau ada)."
        />

        <EditSiteImageForm
          imageKey="about"
          title="Foto Tentang Madrasah"
          description={'Tampil di section "Tentang Madrasah", di samping visi/misi/nilai.'}
          currentUrl={settings.about_image_url}
          defaultHint="Memakai motif geometris bawaan (atau foto di /public/about/madrasah.jpg kalau ada)."
        />

        <EditSiteImageForm
          imageKey="lokasi"
          title="Foto Lokasi / Gedung"
          description={'Tampil di section "Lokasi", di atas kartu alamat dan kontak.'}
          currentUrl={settings.location_image_url}
          defaultHint="Kartu foto ini otomatis disembunyikan (atau memakai foto di /public/lokasi/gedung.jpg kalau ada)."
        />
      </div>
    </>
  );
}
