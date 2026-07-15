export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import EditModal from "@/components/dashboard/EditModal";
import AddPanel from "@/components/dashboard/AddPanel";
import AddStudentForm from "@/components/dashboard/forms/AddStudentForm";
import EditStudentForm from "@/components/dashboard/forms/EditStudentForm";
import EditStudentPhotoForm from "@/components/dashboard/forms/EditStudentPhotoForm";
import { getStudents } from "@/lib/data/students";
import { getClassOptions } from "@/lib/data/classes";
import { deleteStudent } from "@/lib/actions/students";
import { matchQuery } from "@/lib/utils/search";
import type { Student } from "@/lib/types";

export default async function SantriPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const [allStudents, classOptions] = await Promise.all([getStudents(), getClassOptions()]);
  const students = allStudents.filter((s) =>
    matchQuery(q, s.nama, s.nis, s.kelas, s.orang_tua, s.hp)
  );

  const columns: Column<Student>[] = [
    {
      key: "id",
      id: "foto",
      header: "Foto",
      render: (row) => (
        <EditStudentPhotoForm studentId={row.id} fotoUrl={row.foto_url} nama={row.nama} />
      ),
    },
    { key: "nis", header: "NIS" },
    { key: "nama", header: "Nama" },
    { key: "jenis_kelamin", header: "L/P" },
    { key: "kelas", header: "Kelas" },
    { key: "orang_tua", header: "Orang Tua" },
    { key: "hp", header: "No HP" },
    {
      key: "id",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-1">
          <EditModal title={`Edit Santri: ${row.nama}`}>
            <EditStudentForm student={row} classOptions={classOptions} />
          </EditModal>
          <DeleteButton
            action={deleteStudent.bind(null, row.id)}
            confirmText={`Hapus data santri "${row.nama}"?`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Data Santri" searchPlaceholder="Cari nama, NIS, kelas..." />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">
            {students.length} santri{q ? ` ditemukan (dari ${allStudents.length})` : " terdaftar"}
          </p>
          <AddPanel label="Tambah Santri">
            <AddStudentForm classOptions={classOptions} />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={students} emptyMessage={q ? "Tidak ada santri yang cocok dengan pencarian." : "Belum ada data."} />
      </div>
    </>
  );
}
