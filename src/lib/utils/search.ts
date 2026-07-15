/**
 * Util pencarian sederhana dipakai semua halaman dashboard yang punya kolom
 * pencarian (lewat query string `?q=`). Pencocokan case-insensitive,
 * substring biasa (bukan fuzzy) supaya perilakunya predictable buat admin.
 */
export function matchQuery(query: string, ...fields: (string | number | null | undefined)[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => f !== null && f !== undefined && String(f).toLowerCase().includes(q));
}
