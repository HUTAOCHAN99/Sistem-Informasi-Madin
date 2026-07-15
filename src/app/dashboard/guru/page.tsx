export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import EditModal from "@/components/dashboard/EditModal";
import AddPanel from "@/components/dashboard/AddPanel";
import AddTeacherForm from "@/components/dashboard/forms/AddTeacherForm";
import EditTeacherForm from "@/components/dashboard/forms/EditTeacherForm";
import EditTeacherPhotoForm from "@/components/dashboard/forms/EditTeacherPhotoForm";
import { getTeachers } from "@/lib/data/teachers";
import { deleteTeacher } from "@/lib/actions/teachers";
import { matchQuery } from "@/lib/utils/search";
import type { Teacher } from "@/lib/types";

export default async function GuruPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const allTeachers = await getTeachers();
  const teachers = allTeachers.filter((t) => matchQuery(q, t.nama, t.mapel, t.hp));

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
        <div className="flex items-center gap-1">
          <EditModal title={`Edit Guru: ${row.nama}`}>
            <EditTeacherForm teacher={row} />
          </EditModal>
          <DeleteButton
            action={deleteTeacher.bind(null, row.id)}
            confirmText={`Hapus data guru "${row.nama}"?`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Data Guru" searchPlaceholder="Cari nama guru, mapel..." />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">
            {teachers.length} guru{q ? ` ditemukan (dari ${allTeachers.length})` : " terdaftar"}
          </p>
          <AddPanel label="Tambah Guru">
            <AddTeacherForm />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={teachers} emptyMessage={q ? "Tidak ada guru yang cocok dengan pencarian." : "Belum ada data."} />
      </div>
    </>
  );
}
