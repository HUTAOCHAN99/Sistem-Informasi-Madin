export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import AddPanel from "@/components/dashboard/AddPanel";
import AddStudentForm from "@/components/dashboard/forms/AddStudentForm";
import { getStudents } from "@/lib/data/students";
import { getClassOptions } from "@/lib/data/classes";
import { deleteStudent } from "@/lib/actions/students";
import type { Student } from "@/lib/types";

export default async function SantriPage() {
  const [students, classOptions] = await Promise.all([getStudents(), getClassOptions()]);

  const columns: Column<Student>[] = [
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
        <DeleteButton
          action={deleteStudent.bind(null, row.id)}
          confirmText={`Hapus data santri "${row.nama}"?`}
        />
      ),
    },
  ];

  return (
    <>
      <Topbar title="Data Santri" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{students.length} santri terdaftar</p>
          <AddPanel label="Tambah Santri">
            <AddStudentForm classOptions={classOptions} />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={students} />
      </div>
    </>
  );
}
