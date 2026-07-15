export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import AttendanceDatePicker from "@/components/dashboard/AttendanceDatePicker";
import AttendanceList from "@/components/dashboard/AttendanceList";
import { getAttendanceByDate, todayIso } from "@/lib/data/attendance";
import { matchQuery } from "@/lib/utils/search";

export default async function AbsensiPage({
  searchParams,
}: {
  searchParams: { tanggal?: string; q?: string };
}) {
  const tanggal = searchParams.tanggal || todayIso();
  const q = searchParams.q ?? "";
  const allRows = await getAttendanceByDate(tanggal);
  const rows = allRows.filter((r) => matchQuery(q, r.siswa, r.kelas));

  return (
    <>
      <Topbar title="Absensi" searchPlaceholder="Cari nama santri, kelas..." />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-black/50">
            Absensi tanggal {tanggal} — pilih status lalu klik simpan.
            {q && ` (${rows.length} dari ${allRows.length} santri cocok pencarian)`}
          </p>
          <AttendanceDatePicker tanggal={tanggal} />
        </div>
        <AttendanceList tanggal={tanggal} initialRows={rows} />
      </div>
    </>
  );
}
