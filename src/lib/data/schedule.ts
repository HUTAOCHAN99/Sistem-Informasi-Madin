import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { ScheduleItem, Hari } from "@/lib/types";

type ScheduleRowFromDb = {
  id: string;
  hari: Hari;
  jam: string | null;
  mapel: string | null;
  guru_id: string | null;
  kelas_id: string | null;
  teachers: { nama: string } | null;
  classes: { nama_kelas: string } | null;
};

const HARI_ORDER: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export async function getSchedule(): Promise<ScheduleItem[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("schedule")
    .select("id, hari, jam, mapel, guru_id, kelas_id, teachers ( nama ), classes ( nama_kelas )")
    .order("jam", { ascending: true });

  if (error) throw new Error(`Gagal memuat jadwal: ${error.message}`);

  // Jam, mapel, guru, dan kelas semuanya opsional. Field yang kosong dipetakan
  // ke string kosong ("") -- bukan "-" -- supaya konsumen data (landing page,
  // dashboard) bisa membedakan "kosong/tidak diisi" dari nilai literal, lalu
  // memilih sendiri mau disembunyikan atau diberi placeholder.
  const rows = ((data ?? []) as unknown as ScheduleRowFromDb[]).map((s) => ({
    id: s.id,
    hari: s.hari,
    jam: s.jam ?? "",
    mapel: s.mapel ?? "",
    guru_id: s.guru_id,
    guru: s.teachers?.nama ?? "",
    kelas_id: s.kelas_id,
    kelas: s.classes?.nama_kelas ?? "",
  }));

  return rows.sort((a, b) => HARI_ORDER.indexOf(a.hari) - HARI_ORDER.indexOf(b.hari));
}

/** Nama hari ini dalam Bahasa Indonesia, dipakai untuk kartu "Jadwal Hari Ini". */
export function namaHariIni(): Hari {
  // Pakai timezone Asia/Jakarta secara eksplisit, bukan timezone server.
  // Kalau di-deploy di server dengan timezone UTC, new Date().getDay() bisa
  // salah hari untuk jam-jam dini hari WIB (00:00–06:59 WIB = masih hari
  // sebelumnya di UTC), sehingga "Jadwal Hari Ini" jadi 0 padahal ada jadwal.
  const hariEn = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
  }).format(new Date());

  const map: Record<string, Hari> = {
    Sunday: "Minggu",
    Monday: "Senin",
    Tuesday: "Selasa",
    Wednesday: "Rabu",
    Thursday: "Kamis",
    Friday: "Jumat",
    Saturday: "Sabtu",
  };

  return map[hariEn];
}

/** Jam sekarang (menit sejak tengah malam) di timezone Asia/Jakarta. */
function menitSekarangJakarta(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const jam = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const menit = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return jam * 60 + menit;
}

/**
 * Ambil jam mulai dari field `jam` (mis. "16.00 - 16.45" atau "07:00") dan
 * ubah jadi menit sejak tengah malam. Field ini teks bebas yang diisi admin
 * (lihat AddScheduleForm), jadi bisa pakai titik atau titik dua sebagai
 * pemisah jam:menit. Kalau tidak ada pola jam yang cocok (mis. diisi teks
 * seperti "Sepanjang Hari"), return null — dianggap "tidak diketahui".
 */
function jamMulaiKeMenit(jam: string): number | null {
  const match = jam.match(/(\d{1,2})[.:](\d{2})/);
  if (!match) return null;

  const jamNum = Number(match[1]);
  const menitNum = Number(match[2]);
  if (Number.isNaN(jamNum) || Number.isNaN(menitNum)) return null;

  return jamNum * 60 + menitNum;
}

/**
 * Jadwal terdekat dari waktu sekarang (bukan sekadar urut Senin→Minggu
 * seperti `getSchedule`). Logikanya:
 *
 * 1. Hitung "jarak hari" tiap jadwal dari hari ini, berputar maju secara
 *    siklis (hari ini = 0, besok = 1, ..., 6 hari lagi = 6).
 * 2. Untuk jadwal di hari ini juga, kalau jam mulainya sudah lewat jam
 *    sekarang, jarak harinya didorong +7 — dianggap baru terjadi lagi
 *    minggu depan, supaya tidak nongol di urutan teratas padahal sudah
 *    selesai.
 * 3. Di dalam hari yang sama, diurutkan dari jam mulai paling awal.
 * 4. Kalau jam tidak bisa di-parse (teks bebas / non-standar), jadwal itu
 *    tetap ditampilkan tapi diletakkan paling akhir di hari itu — karena
 *    tidak bisa dipastikan sudah lewat atau belum, tidak diberi prioritas.
 *
 * Return seluruh jadwal terurut (tidak dipotong); pemanggil yang menentukan
 * mau ambil berapa banyak (mis. `.slice(0, 5)`).
 */
export async function getJadwalTerdekat(): Promise<ScheduleItem[]> {
  const semua = await getSchedule();

  const hariIni = namaHariIni();
  const indexHariIni = HARI_ORDER.indexOf(hariIni);
  const menitSekarang = menitSekarangJakarta();

  const withRank = semua.map((item) => {
    const menitMulai = jamMulaiKeMenit(item.jam);
    let jarakHari = (HARI_ORDER.indexOf(item.hari) - indexHariIni + 7) % 7;

    if (jarakHari === 0 && menitMulai !== null && menitMulai < menitSekarang) {
      jarakHari += 7; // sudah lewat hari ini -> hitung dari minggu depan
    }

    return { item, jarakHari, menitMulai: menitMulai ?? Infinity };
  });

  withRank.sort((a, b) => {
    if (a.jarakHari !== b.jarakHari) return a.jarakHari - b.jarakHari;
    return a.menitMulai - b.menitMulai;
  });

  return withRank.map((r) => r.item);
}
