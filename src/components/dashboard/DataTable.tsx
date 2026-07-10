export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <div className="bg-white rounded-xl2 border border-madin-line overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-madin-cream text-left text-black/50 text-xs uppercase tracking-wide">
            {columns.map((col) => (
              <th key={String(col.key)} className="px-5 py-3 font-medium">
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
                <td key={String(col.key)} className="px-5 py-3 text-madin-navy/90">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-black/40">
                Belum ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
