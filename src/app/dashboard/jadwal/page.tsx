import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import { schedule, ScheduleItem } from "@/lib/dummy-data";

const columns: Column<ScheduleItem>[] = [
  { key: "hari", header: "Hari" },
  { key: "jam", header: "Jam" },
  { key: "mapel", header: "Mata Pelajaran" },
  { key: "guru", header: "Guru" },
  { key: "kelas", header: "Kelas" },
];

export default function JadwalPage() {
  return (
    <>
      <Topbar title="Jadwal Pelajaran" />
      <div className="p-6">
        <DataTable columns={columns} rows={schedule} />
      </div>
    </>
  );
}
