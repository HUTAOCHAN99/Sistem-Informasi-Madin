import { createPayment } from "@/lib/actions/payments";
import { NAMA_BULAN } from "@/lib/utils/format";
import type { SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function AddSppForm({
  studentOptions,
  defaultBulan,
  defaultTahun,
}: {
  studentOptions: SelectOption[];
  defaultBulan: number;
  defaultTahun: number;
}) {
  return (
    <form action={createPayment} className="grid sm:grid-cols-3 gap-4">
      <div className="sm:col-span-2">
        <label className={label}>Santri</label>
        <select name="siswa_id" required defaultValue="" className={input}>
          <option value="" disabled>
            Pilih santri
          </option>
          {studentOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Status</label>
        <select name="status" defaultValue="Belum Lunas" className={input}>
          <option value="Belum Lunas">Belum Lunas</option>
          <option value="Lunas">Lunas</option>
        </select>
      </div>

      <div>
        <label className={label}>Bulan</label>
        <select name="bulan" defaultValue={defaultBulan} className={input}>
          {NAMA_BULAN.map((nama, i) => (
            <option key={nama} value={i + 1}>
              {nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Tahun</label>
        <input
          name="tahun"
          type="number"
          required
          defaultValue={defaultTahun}
          className={input}
        />
      </div>
      <div>
        <label className={label}>Nominal (Rp)</label>
        <input name="nominal" type="number" min={0} step={1000} defaultValue={150000} className={input} />
      </div>

      <div>
        <label className={label}>Tanggal Bayar</label>
        <input name="tanggal_bayar" type="date" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Keterangan</label>
        <input name="keterangan" placeholder="Opsional" className={input} />
      </div>

      <div className="sm:col-span-3">
        <button
          type="submit"
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Simpan Pembayaran
        </button>
      </div>
    </form>
  );
}
