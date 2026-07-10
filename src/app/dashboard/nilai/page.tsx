import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import { grades, GradeRow } from "@/lib/dummy-data";

function nilaiAkhir(row: GradeRow) {
  // Bobot contoh: harian 30%, UTS 30%, UAS 40% — bisa disesuaikan nanti.
  return Math.round(row.harian * 0.3 + row.uts * 0.3 + row.uas * 0.4);
}

const columns: Column<GradeRow>[] = [
  { key: "siswa", header: "Santri" },
  { key: "mapel", header: "Mata Pelajaran" },
  { key: "harian", header: "Harian" },
  { key: "uts", header: "UTS" },
  { key: "uas", header: "UAS" },
  {
    key: "id",
    header: "Nilai Akhir",
    render: (row) => (
      <span className="font-semibold text-madin-teal">{nilaiAkhir(row)}</span>
    ),
  },
];

export default function NilaiPage() {
  return (
    <>
      <Topbar title="Nilai" />
      <div className="p-6 space-y-4">
        <p className="text-sm text-black/50">
          Nilai akhir dihitung otomatis dari Harian (30%), UTS (30%), UAS (40%).
        </p>
        <DataTable columns={columns} rows={grades} />
      </div>
    </>
  );
}
