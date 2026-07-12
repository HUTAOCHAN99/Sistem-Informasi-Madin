export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import EditModal from "@/components/dashboard/EditModal";
import AddPanel from "@/components/dashboard/AddPanel";
import AddScheduleForm from "@/components/dashboard/forms/AddScheduleForm";
import EditScheduleForm from "@/components/dashboard/forms/EditScheduleForm";
import { getSchedule } from "@/lib/data/schedule";
import { getTeacherOptions } from "@/lib/data/teachers";
import { getClassOptions } from "@/lib/data/classes";
import { deleteSchedule } from "@/lib/actions/schedule";
import type { ScheduleItem } from "@/lib/types";

export default async function JadwalPage() {
  const [schedule, teacherOptions, classOptions] = await Promise.all([
    getSchedule(),
    getTeacherOptions(),
    getClassOptions(),
  ]);

  const columns: Column<ScheduleItem>[] = [
    { key: "hari", header: "Hari" },
    { key: "jam", header: "Jam" },
    { key: "mapel", header: "Mata Pelajaran" },
    { key: "guru", header: "Guru" },
    { key: "kelas", header: "Kelas" },
    {
      key: "id",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-1">
          <EditModal title={`Edit Jadwal: ${row.mapel}`}>
            <EditScheduleForm
              item={row}
              teacherOptions={teacherOptions}
              classOptions={classOptions}
            />
          </EditModal>
          <DeleteButton
            action={deleteSchedule.bind(null, row.id)}
            confirmText={`Hapus jadwal "${row.mapel}" (${row.hari}, ${row.jam})?`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Jadwal Pelajaran" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{schedule.length} sesi terjadwal</p>
          <AddPanel label="Tambah Jadwal">
            <AddScheduleForm teacherOptions={teacherOptions} classOptions={classOptions} />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={schedule} />
      </div>
    </>
  );
}
