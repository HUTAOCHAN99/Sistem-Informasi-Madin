// src/lib/types.ts
//
// Tipe data untuk bentuk "tampilan" (sudah di-join, siap dipakai komponen),
// dipakai oleh semua halaman dashboard. Nama field sengaja disamakan dengan
// versi dummy-data.ts lama supaya komponen (DataTable dkk.) tidak perlu
// diubah bentuknya.

export type Teacher = {
  id: string;
  nama: string;
  mapel: string;
  hp: string;
};

export type Jenjang = "Awaliyah" | "Wustha" | "Ulya";

export type StudentClass = {
  id: string;
  nama_kelas: string;
  jenjang: Jenjang;
  wali_kelas_id: string | null;
  wali_kelas: string; // nama wali kelas, sudah di-join. "-" kalau kosong.
  jumlah_santri: number;
};

export type Student = {
  id: string;
  nama: string;
  nis: string;
  jenis_kelamin: "L" | "P";
  kelas_id: string | null;
  kelas: string; // nama kelas, sudah di-join. "-" kalau belum punya kelas.
  orang_tua: string;
  hp: string;
};

export type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";

export type ScheduleItem = {
  id: string;
  hari: Hari;
  jam: string;
  mapel: string;
  guru_id: string | null;
  guru: string;
  kelas_id: string | null;
  kelas: string;
};

export type AttendanceStatus = "Hadir" | "Izin" | "Sakit" | "Alpha";

export type AttendanceRow = {
  id: string;
  siswa_id: string;
  siswa: string;
  kelas: string;
  tanggal: string;
  status: AttendanceStatus;
};

export type GradeRow = {
  id: string;
  siswa_id: string;
  siswa: string;
  mapel: string;
  harian: number;
  uts: number;
  uas: number;
};

export type Announcement = {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
};

export type DashboardStats = {
  totalGuru: number;
  totalSantri: number;
  totalKelas: number;
  pengumumanAktif: number;
  jadwalHariIni: number;
};

/** Untuk dropdown pilihan di form (mis. pilih guru / pilih kelas). */
export type SelectOption = { id: string; label: string };
