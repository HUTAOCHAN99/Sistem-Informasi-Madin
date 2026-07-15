export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import EditModal from "@/components/dashboard/EditModal";
import AddPanel from "@/components/dashboard/AddPanel";
import AddGradeForm from "@/components/dashboard/forms/AddGradeForm";
import EditGradeForm from "@/components/dashboard/forms/EditGradeForm";
import { getGrades } from "@/lib/data/grades";
import { getStudentOptions } from "@/lib/data/students";
import { deleteGrade } from "@/lib/actions/grades";
import { matchQuery } from "@/lib/utils/search";
import type { GradeRow } from "@/lib/types";

function nilaiAkhir(row: GradeRow) {
  // Bobot: harian 30%, UTS 30%, UAS 40% — bisa disesuaikan sesuai kebijakan.
  return Math.round(row.harian * 0.3 + row.uts * 0.3 + row.uas * 0.4);
}

export default async function NilaiPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const [allGrades, studentOptions] = await Promise.all([getGrades(), getStudentOptions()]);
  const grades = allGrades.filter((g) => matchQuery(q, g.siswa, g.mapel));

  const columns: Column<GradeRow>[] = [
    { key: "siswa", header: "Santri" },
    { key: "mapel", header: "Mata Pelajaran" },
    { key: "harian", header: "Harian" },
    { key: "uts", header: "UTS" },
    { key: "uas", header: "UAS" },
    {
      key: "id",
      id: "nilai_akhir",
      header: "Nilai Akhir",
      render: (row) => <span className="font-semibold text-madin-teal">{nilaiAkhir(row)}</span>,
    },
    {
      key: "id",
      id: "aksi",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-1">
          <EditModal title={`Edit Nilai: ${row.siswa} - ${row.mapel}`}>
            <EditGradeForm grade={row} studentOptions={studentOptions} />
          </EditModal>
          <DeleteButton
            action={deleteGrade.bind(null, row.id)}
            confirmText={`Hapus nilai ${row.mapel} milik ${row.siswa}?`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Nilai" searchPlaceholder="Cari nama santri, mapel..." />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-black/50">
            {q
              ? `${grades.length} nilai ditemukan (dari ${allGrades.length}).`
              : "Nilai akhir dihitung otomatis dari Harian (30%), UTS (30%), UAS (40%)."}
          </p>
          <AddPanel label="Tambah Nilai">
            <AddGradeForm studentOptions={studentOptions} />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={grades} emptyMessage={q ? "Tidak ada nilai yang cocok dengan pencarian." : "Belum ada data."} />
      </div>
    </>
  );
}
