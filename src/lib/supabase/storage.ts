// src/lib/supabase/storage.ts
//
// Helper upload/hapus foto guru & santri ke Supabase Storage. Bucket-nya
// publik ("guru-photos" / "santri-photos", lihat supabase/schema.sql) supaya
// foto bisa langsung ditampilkan tanpa signed URL. Upload/hapus hanya boleh
// dipanggil dari server (server action / server component) karena butuh
// service role key lewat getSupabaseServer().

import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";

export const TEACHER_PHOTO_BUCKET = "guru-photos";
export const STUDENT_PHOTO_BUCKET = "santri-photos";
export const GALLERY_PHOTO_BUCKET = "gallery-photos";
export const SITE_PHOTO_BUCKET = "site-photos";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

function extFromType(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

/**
 * Upload satu file foto ke bucket publik yang diberikan dan kembalikan
 * public URL-nya. Melempar Error dengan pesan yang aman ditampilkan ke user
 * kalau file tidak valid (format/ukuran) atau upload gagal.
 */
async function uploadPhoto(bucket: string, file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Foto harus berformat JPG, PNG, atau WEBP.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Ukuran foto maksimal 2MB.");
  }

  const supabase = getSupabaseServer();
  const path = `${crypto.randomUUID()}.${extFromType(file.type)}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Gagal mengunggah foto: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Hapus foto lama dari storage. Aman dipanggil dengan url null/undefined,
 * atau url yang bukan berasal dari bucket ini (mis. foto statis lama di
 * /public/*) — pada kasus itu fungsi ini tidak melakukan apa-apa.
 */
async function deletePhoto(bucket: string, url: string | null | undefined) {
  if (!url) return;

  const marker = `/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;

  const path = url.slice(idx + marker.length);
  if (!path) return;

  const supabase = getSupabaseServer();
  // Sengaja tidak melempar error kalau hapus gagal (mis. file sudah tidak
  // ada) — ini operasi housekeeping, tidak boleh menggagalkan aksi utama
  // (simpan/hapus data) yang sudah berhasil.
  await supabase.storage.from(bucket).remove([path]);
}

export async function uploadTeacherPhoto(file: File): Promise<string> {
  return uploadPhoto(TEACHER_PHOTO_BUCKET, file);
}

export async function deleteTeacherPhoto(url: string | null | undefined) {
  return deletePhoto(TEACHER_PHOTO_BUCKET, url);
}

export async function uploadStudentPhoto(file: File): Promise<string> {
  return uploadPhoto(STUDENT_PHOTO_BUCKET, file);
}

export async function deleteStudentPhoto(url: string | null | undefined) {
  return deletePhoto(STUDENT_PHOTO_BUCKET, url);
}

export async function uploadGalleryPhoto(file: File): Promise<string> {
  return uploadPhoto(GALLERY_PHOTO_BUCKET, file);
}

export async function deleteGalleryPhoto(url: string | null | undefined) {
  return deletePhoto(GALLERY_PHOTO_BUCKET, url);
}

/**
 * Foto tampilan landing page (Hero, Tentang, Lokasi) yang bisa diganti admin
 * lewat halaman Pengaturan Tampilan di dashboard. Disimpan di bucket publik
 * terpisah supaya tidak tercampur dengan foto guru/santri/galeri.
 */
export async function uploadSitePhoto(file: File): Promise<string> {
  return uploadPhoto(SITE_PHOTO_BUCKET, file);
}

export async function deleteSitePhoto(url: string | null | undefined) {
  return deletePhoto(SITE_PHOTO_BUCKET, url);
}
