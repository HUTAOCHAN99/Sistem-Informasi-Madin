export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DeleteButton from "@/components/dashboard/DeleteButton";
import AddPanel from "@/components/dashboard/AddPanel";
import AddClassForm from "@/components/dashboard/forms/AddClassForm";
import { getClasses } from "@/lib/data/classes";
import { getTeacherOptions } from "@/lib/data/teachers";
import { deleteClass } from "@/lib/actions/classes";
import type { Jenjang } from "@/lib/types";

const jenjangList: Jenjang[] = ["Awaliyah", "Wustha", "Ulya"];

export default async function KelasPage() {
  const [classes, teacherOptions] = await Promise.all([getClasses(), getTeacherOptions()]);

  return (
    <>
      <Topbar title="Data Kelas" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">{classes.length} kelas terdaftar</p>
          <AddPanel label="Tambah Kelas">
            <AddClassForm teacherOptions={teacherOptions} />
          </AddPanel>
        </div>

        {jenjangList.map((jenjang) => {
          const items = classes.filter((c) => c.jenjang === jenjang);
          if (items.length === 0) return null;
          return (
            <div key={jenjang}>
              <h2 className="font-display font-semibold text-madin-navy mb-3">{jenjang}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl2 border border-madin-line p-5 flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-madin-navy">{c.nama_kelas}</p>
                      <p className="text-xs text-black/50 mt-1">Wali kelas: {c.wali_kelas}</p>
                      <p className="text-xs text-madin-teal mt-2">{c.jumlah_santri} santri</p>
                    </div>
                    <DeleteButton
                      action={deleteClass.bind(null, c.id)}
                      confirmText={`Hapus kelas "${c.nama_kelas}"? Santri di kelas ini tidak akan terhapus, hanya kehilangan kelasnya.`}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {classes.length === 0 && (
          <p className="text-sm text-black/40">Belum ada kelas. Tambahkan lewat tombol di atas.</p>
        )}
      </div>
    </>
  );
}
