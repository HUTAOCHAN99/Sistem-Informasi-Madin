export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import AttendanceDatePicker from "@/components/dashboard/AttendanceDatePicker";
import AttendanceList from "@/components/dashboard/AttendanceList";
import { getAttendanceByDate, todayIso } from "@/lib/data/attendance";

export default async function AbsensiPage({
  searchParams,
}: {
  searchParams: { tanggal?: string };
}) {
  const tanggal = searchParams.tanggal || todayIso();
  const rows = await getAttendanceByDate(tanggal);

  return (
    <>
      <Topbar title="Absensi" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-black/50">
            Absensi tanggal {tanggal} — pilih status lalu klik simpan.
          </p>
          <AttendanceDatePicker tanggal={tanggal} />
        </div>
        <AttendanceList tanggal={tanggal} initialRows={rows} />
      </div>
    </>
  );
}
