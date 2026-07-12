export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import AddPanel from "@/components/dashboard/AddPanel";
import AddTeacherForm from "@/components/dashboard/forms/AddTeacherForm";
import EditTeacherPhotoForm from "@/components/dashboard/forms/EditTeacherPhotoForm";
import { getTeachers } from "@/lib/data/teachers";
import { deleteTeacher } from "@/lib/actions/teachers";
import type { Teacher } from "@/lib/types";

export default async function GuruPage() {
  const teachers = await getTeachers();

  const columns: Column<Teacher>[] = [
    {
      key: "id",
      id: "foto",
      header: "Foto",
      render: (row) => (
        <EditTeacherPhotoForm teacherId={row.id} fotoUrl={row.foto_url} nama={row.nama} />
      ),
    },
    { key: "nama", header: "Nama" },
    { key: "mapel", header: "Mata Pelajaran" },
    { key: "hp", header: "No HP" },
    {
      key: "id",
      header: "Aksi",
      render: (row) => (
        <DeleteButton
          action={deleteTeacher.bind(null, row.id)}
          confirmText={`Hapus data guru "${row.nama}"?`}
        />
      ),
    },
  ];

  return (
    <>
      <Topbar title="Data Guru" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{teachers.length} guru terdaftar</p>
          <AddPanel label="Tambah Guru">
            <AddTeacherForm />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={teachers} />
      </div>
    </>
  );
}
