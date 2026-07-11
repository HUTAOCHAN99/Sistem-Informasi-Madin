export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import AddPanel from "@/components/dashboard/AddPanel";
import AddGradeForm from "@/components/dashboard/forms/AddGradeForm";
import { getGrades } from "@/lib/data/grades";
import { getStudentOptions } from "@/lib/data/students";
import { deleteGrade } from "@/lib/actions/grades";
import type { GradeRow } from "@/lib/types";

function nilaiAkhir(row: GradeRow) {
  // Bobot: harian 30%, UTS 30%, UAS 40% — bisa disesuaikan sesuai kebijakan.
  return Math.round(row.harian * 0.3 + row.uts * 0.3 + row.uas * 0.4);
}

export default async function NilaiPage() {
  const [grades, studentOptions] = await Promise.all([getGrades(), getStudentOptions()]);

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
        <DeleteButton
          action={deleteGrade.bind(null, row.id)}
          confirmText={`Hapus nilai ${row.mapel} milik ${row.siswa}?`}
        />
      ),
    },
  ];

  return (
    <>
      <Topbar title="Nilai" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-black/50">
            Nilai akhir dihitung otomatis dari Harian (30%), UTS (30%), UAS (40%).
          </p>
          <AddPanel label="Tambah Nilai">
            <AddGradeForm studentOptions={studentOptions} />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={grades} />
      </div>
    </>
  );
}
