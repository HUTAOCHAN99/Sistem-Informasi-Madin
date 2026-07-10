import Topbar from "@/components/dashboard/Topbar";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import { students, Student } from "@/lib/dummy-data";
import { Plus } from "lucide-react";

const columns: Column<Student>[] = [
  { key: "nis", header: "NIS" },
  { key: "nama", header: "Nama" },
  { key: "jenis_kelamin", header: "L/P" },
  { key: "kelas", header: "Kelas" },
  { key: "orang_tua", header: "Orang Tua" },
  { key: "hp", header: "No HP" },
];

export default function SantriPage() {
  return (
    <>
      <Topbar title="Data Santri" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{students.length} santri terdaftar</p>
          <button className="flex items-center gap-2 bg-madin-orange text-madin-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors">
            <Plus className="w-4 h-4" /> Tambah Santri
          </button>
        </div>
        <DataTable columns={columns} rows={students} />
      </div>
    </>
  );
}
