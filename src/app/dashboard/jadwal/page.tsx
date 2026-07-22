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
import { matchQuery } from "@/lib/utils/search";
import type { ScheduleItem } from "@/lib/types";

export default async function JadwalPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const [allSchedule, teacherOptions, classOptions] = await Promise.all([
    getSchedule(),
    getTeacherOptions(),
    getClassOptions(),
  ]);
  const schedule = allSchedule.filter((s) =>
    matchQuery(q, s.hari, s.jam, s.mapel, s.guru, s.kelas)
  );

  const columns: Column<ScheduleItem>[] = [
    { key: "hari", header: "Hari" },
    { key: "jam", header: "Jam", render: (row) => row.jam || "-" },
    { key: "mapel", header: "Mata Pelajaran", render: (row) => row.mapel || "-" },
    { key: "guru", header: "Guru", render: (row) => row.guru || "-" },
    { key: "kelas", header: "Kelas", render: (row) => row.kelas || "-" },
    {
      key: "id",
      header: "Aksi",
      render: (row) => {
        const label = row.mapel || row.hari;
        return (
          <div className="flex items-center gap-1">
            <EditModal title={`Edit Jadwal: ${label}`}>
              <EditScheduleForm
                item={row}
                teacherOptions={teacherOptions}
                classOptions={classOptions}
              />
            </EditModal>
            <DeleteButton
              action={deleteSchedule.bind(null, row.id)}
              confirmText={`Hapus jadwal "${label}" (${row.hari}${row.jam ? `, ${row.jam}` : ""})?`}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Topbar title="Jadwal Pelajaran" searchPlaceholder="Cari mapel, guru, kelas..." />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">
            {schedule.length} sesi{q ? ` ditemukan (dari ${allSchedule.length})` : " terjadwal"}
          </p>
          <AddPanel label="Tambah Jadwal">
            <AddScheduleForm teacherOptions={teacherOptions} classOptions={classOptions} />
          </AddPanel>
        </div>
        <DataTable columns={columns} rows={schedule} emptyMessage={q ? "Tidak ada jadwal yang cocok dengan pencarian." : "Belum ada data."} />
      </div>
    </>
  );
}
