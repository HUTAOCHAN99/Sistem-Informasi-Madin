export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
  /**
   * Pengenal unik kolom, dipakai sebagai React key. Wajib diisi kalau ada
   * lebih dari satu kolom yang memakai `key` yang sama (mis. dua kolom
   * turunan/aksi yang sama-sama memakai `id` hanya untuk akses row.id).
   * Default-nya String(key).
   */
  id?: string;
};

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "Belum ada data.",
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
}) {
  return (
    <div className="bg-white rounded-xl2 border border-madin-line overflow-hidden">
      <div className="overflow-x-auto md-scroll-thin">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="bg-madin-cream text-left text-black/50 text-xs uppercase tracking-wide">
              {columns.map((col) => (
                <th
                  key={col.id ?? String(col.key)}
                  className="px-5 py-3 font-medium whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-t border-madin-line ${i % 2 === 1 ? "bg-madin-cream/40" : ""}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.id ?? String(col.key)}
                    className="px-5 py-3 text-madin-navy/90 whitespace-nowrap"
                  >
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8 text-center text-black/40">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
