// src/lib/supabase/storage.ts
//
// Helper upload/hapus foto guru ke Supabase Storage. Bucket-nya publik
// ("guru-photos", lihat supabase/schema.sql) supaya foto bisa langsung
// ditampilkan di landing page tanpa signed URL. Upload/hapus hanya boleh
// dipanggil dari server (server action / server component) karena butuh
// service role key lewat getSupabaseServer().

import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";

export const TEACHER_PHOTO_BUCKET = "guru-photos";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

function extFromType(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

/**
 * Upload satu file foto guru ke bucket "guru-photos" dan kembalikan public
 * URL-nya. Melempar Error dengan pesan yang aman ditampilkan ke user kalau
 * file tidak valid (format/ukuran) atau upload gagal.
 */
export async function uploadTeacherPhoto(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Foto harus berformat JPG, PNG, atau WEBP.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Ukuran foto maksimal 2MB.");
  }

  const supabase = getSupabaseServer();
  const path = `${crypto.randomUUID()}.${extFromType(file.type)}`;

  const { error } = await supabase.storage
    .from(TEACHER_PHOTO_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Gagal mengunggah foto: ${error.message}`);

  const { data } = supabase.storage.from(TEACHER_PHOTO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Hapus foto lama dari storage. Aman dipanggil dengan url null/undefined,
 * atau url yang bukan berasal dari bucket ini (mis. foto statis lama di
 * /public/guru/*.jpg) — pada kasus itu fungsi ini tidak melakukan apa-apa.
 */
export async function deleteTeacherPhoto(url: string | null | undefined) {
  if (!url) return;

  const marker = `/object/public/${TEACHER_PHOTO_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;

  const path = url.slice(idx + marker.length);
  if (!path) return;

  const supabase = getSupabaseServer();
  // Sengaja tidak melempar error kalau hapus gagal (mis. file sudah tidak
  // ada) — ini operasi housekeeping, tidak boleh menggagalkan aksi utama
  // (simpan/hapus guru) yang sudah berhasil.
  await supabase.storage.from(TEACHER_PHOTO_BUCKET).remove([path]);
}
