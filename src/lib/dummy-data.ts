// src/lib/dummy-data.ts
//
// Data dummy ini sengaja dibentuk MENYERUPAI hasil query Supabase
// (tabel: teachers, students, classes, schedule, attendance, grades,
// announcements) sesuai struktur database di ringkasan. Tujuannya
// supaya ketika nanti kolom "dummy" diganti "supabase.from(...)",
// bentuk datanya sudah cocok dan komponen tidak perlu diubah.

export type Teacher = {
  id: string;
  nama: string;
  mapel: string;
  hp: string;
};

export type StudentClass = {
  id: string;
  nama_kelas: string;
  jenjang: "Awaliyah" | "Wustha" | "Ulya";
  wali_kelas: string;
  jumlah_santri: number;
};

export type Student = {
  id: string;
  nama: string;
  nis: string;
  jenis_kelamin: "L" | "P";
  kelas: string;
  orang_tua: string;
  hp: string;
};

export type ScheduleItem = {
  id: string;
  hari: string;
  jam: string;
  mapel: string;
  guru: string;
  kelas: string;
};

export type AttendanceStatus = "Hadir" | "Izin" | "Sakit" | "Alpha";

export type AttendanceRow = {
  id: string;
  siswa: string;
  kelas: string;
  tanggal: string;
  status: AttendanceStatus;
};

export type GradeRow = {
  id: string;
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

export const teachers: Teacher[] = [
  { id: "1", nama: "Ust. Ahmad Fauzi", mapel: "Fiqih", hp: "0812-1111-2222" },
  { id: "2", nama: "Ust. Ali Rahman", mapel: "Al-Qur'an", hp: "0813-2222-3333" },
  { id: "3", nama: "Usth. Siti Aminah", mapel: "Akhlak", hp: "0821-3333-4444" },
  { id: "4", nama: "Ust. Zainal Abidin", mapel: "Tauhid", hp: "0852-4444-5555" },
  { id: "5", nama: "Usth. Nur Hidayah", mapel: "Bahasa Arab", hp: "0878-5555-6666" },
];

export const classes: StudentClass[] = [
  { id: "1", nama_kelas: "Awaliyah 1", jenjang: "Awaliyah", wali_kelas: "Ust. Ahmad Fauzi", jumlah_santri: 24 },
  { id: "2", nama_kelas: "Awaliyah 2", jenjang: "Awaliyah", wali_kelas: "Usth. Siti Aminah", jumlah_santri: 22 },
  { id: "3", nama_kelas: "Wustha 1", jenjang: "Wustha", wali_kelas: "Ust. Ali Rahman", jumlah_santri: 20 },
  { id: "4", nama_kelas: "Wustha 2", jenjang: "Wustha", wali_kelas: "Ust. Zainal Abidin", jumlah_santri: 18 },
  { id: "5", nama_kelas: "Ulya 1", jenjang: "Ulya", wali_kelas: "Usth. Nur Hidayah", jumlah_santri: 16 },
];

export const students: Student[] = [
  { id: "1", nama: "Muhammad Fajar", nis: "2026001", jenis_kelamin: "L", kelas: "Awaliyah 1", orang_tua: "Bpk. Sudarmono", hp: "0812-0001-0001" },
  { id: "2", nama: "Aisyah Putri", nis: "2026002", jenis_kelamin: "P", kelas: "Awaliyah 1", orang_tua: "Bpk. Hendra", hp: "0812-0002-0002" },
  { id: "3", nama: "Rizky Ramadhan", nis: "2026003", jenis_kelamin: "L", kelas: "Awaliyah 2", orang_tua: "Bpk. Yusuf", hp: "0812-0003-0003" },
  { id: "4", nama: "Nabila Zahra", nis: "2026004", jenis_kelamin: "P", kelas: "Wustha 1", orang_tua: "Bpk. Agus", hp: "0812-0004-0004" },
  { id: "5", nama: "Fikri Maulana", nis: "2026005", jenis_kelamin: "L", kelas: "Wustha 2", orang_tua: "Bpk. Rahmat", hp: "0812-0005-0005" },
  { id: "6", nama: "Salsabila Putri", nis: "2026006", jenis_kelamin: "P", kelas: "Ulya 1", orang_tua: "Bpk. Wahyu", hp: "0812-0006-0006" },
];

export const schedule: ScheduleItem[] = [
  { id: "1", hari: "Senin", jam: "16.00 - 16.45", mapel: "Al-Qur'an", guru: "Ust. Ali Rahman", kelas: "Awaliyah 1" },
  { id: "2", hari: "Senin", jam: "17.00 - 17.45", mapel: "Fiqih", guru: "Ust. Ahmad Fauzi", kelas: "Awaliyah 1" },
  { id: "3", hari: "Selasa", jam: "16.00 - 16.45", mapel: "Akhlak", guru: "Usth. Siti Aminah", kelas: "Awaliyah 2" },
  { id: "4", hari: "Rabu", jam: "16.00 - 16.45", mapel: "Tauhid", guru: "Ust. Zainal Abidin", kelas: "Wustha 1" },
  { id: "5", hari: "Kamis", jam: "16.00 - 16.45", mapel: "Bahasa Arab", guru: "Usth. Nur Hidayah", kelas: "Ulya 1" },
];

export const attendance: AttendanceRow[] = [
  { id: "1", siswa: "Muhammad Fajar", kelas: "Awaliyah 1", tanggal: "2026-07-06", status: "Hadir" },
  { id: "2", siswa: "Aisyah Putri", kelas: "Awaliyah 1", tanggal: "2026-07-06", status: "Izin" },
  { id: "3", siswa: "Rizky Ramadhan", kelas: "Awaliyah 2", tanggal: "2026-07-06", status: "Hadir" },
  { id: "4", siswa: "Nabila Zahra", kelas: "Wustha 1", tanggal: "2026-07-06", status: "Sakit" },
  { id: "5", siswa: "Fikri Maulana", kelas: "Wustha 2", tanggal: "2026-07-06", status: "Alpha" },
];

export const grades: GradeRow[] = [
  { id: "1", siswa: "Muhammad Fajar", mapel: "Al-Qur'an", harian: 85, uts: 80, uas: 88 },
  { id: "2", siswa: "Aisyah Putri", mapel: "Fiqih", harian: 90, uts: 85, uas: 92 },
  { id: "3", siswa: "Rizky Ramadhan", mapel: "Akhlak", harian: 78, uts: 82, uas: 80 },
  { id: "4", siswa: "Nabila Zahra", mapel: "Tauhid", harian: 88, uts: 90, uas: 91 },
];

export const announcements: Announcement[] = [
  { id: "1", judul: "Libur Idul Adha 1447 H", isi: "Kegiatan belajar diliburkan selama 3 hari.", tanggal: "2026-06-15" },
  { id: "2", judul: "Jadwal Imtihan Semester Genap", isi: "Ujian akan dilaksanakan mulai minggu depan.", tanggal: "2026-07-01" },
  { id: "3", judul: "Wisuda Santri Ulya", isi: "Prosesi wisuda akan diadakan di aula utama.", tanggal: "2026-07-20" },
];

// Ringkasan untuk kartu statistik di dashboard — nanti bisa diganti
// dengan hasil count() dari Supabase.
export const dashboardStats = {
  totalGuru: teachers.length,
  totalSantri: students.length,
  totalKelas: classes.length,
  pengumumanAktif: announcements.length,
  jadwalHariIni: schedule.filter((s) => s.hari === "Senin").length,
};
