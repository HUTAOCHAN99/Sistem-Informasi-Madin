import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import { teachers, Teacher } from "@/lib/dummy-data";
import { Plus } from "lucide-react";

const columns: Column<Teacher>[] = [
  { key: "nama", header: "Nama" },
  { key: "mapel", header: "Mata Pelajaran" },
  { key: "hp", header: "No HP" },
];

export default function GuruPage() {
  return (
    <>
      <Topbar title="Data Guru" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{teachers.length} guru terdaftar</p>
          <button className="flex items-center gap-2 bg-madin-orange text-madin-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors">
            <Plus className="w-4 h-4" /> Tambah Guru
          </button>
        </div>
        <DataTable columns={columns} rows={teachers} />
      </div>
    </>
  );
}
