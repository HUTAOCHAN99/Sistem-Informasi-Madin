"use client";

import { useState } from "react";
import { updatePayment } from "@/lib/actions/payments";
import { useCloseEditModal } from "@/components/dashboard/EditModal";
import { NAMA_BULAN } from "@/lib/utils/format";
import type { PaymentRow, SelectOption } from "@/lib/types";

const input =
  "w-full rounded-lg border border-madin-line px-3 py-2 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40";
const label = "text-xs font-medium text-black/60 mb-1 block";

export default function EditSppForm({
  payment,
  studentOptions,
}: {
  payment: PaymentRow;
  studentOptions: SelectOption[];
}) {
  const onDone = useCloseEditModal();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        setPending(true);
        try {
          await updatePayment(payment.id, formData);
          onDone();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal memperbarui pembayaran SPP.");
        } finally {
          setPending(false);
        }
      }}
      className="grid sm:grid-cols-3 gap-4"
    >
      <div className="sm:col-span-2">
        <label className={label}>Santri</label>
        <select name="siswa_id" required defaultValue={payment.siswa_id} className={input}>
          {studentOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Status</label>
        <select name="status" defaultValue={payment.status} className={input}>
          <option value="Belum Lunas">Belum Lunas</option>
          <option value="Lunas">Lunas</option>
        </select>
      </div>

      <div>
        <label className={label}>Bulan</label>
        <select name="bulan" defaultValue={payment.bulan} className={input}>
          {NAMA_BULAN.map((nama, i) => (
            <option key={nama} value={i + 1}>
              {nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Tahun</label>
        <input name="tahun" type="number" required defaultValue={payment.tahun} className={input} />
      </div>
      <div>
        <label className={label}>Nominal (Rp)</label>
        <input
          name="nominal"
          type="number"
          min={0}
          step={1000}
          defaultValue={payment.nominal}
          className={input}
        />
      </div>

      <div>
        <label className={label}>Tanggal Bayar</label>
        <input
          name="tanggal_bayar"
          type="date"
          defaultValue={payment.tanggal_bayar ?? ""}
          className={input}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Keterangan</label>
        <input name="keterangan" defaultValue={payment.keterangan} className={input} />
      </div>

      {error && <p className="sm:col-span-3 text-red-600 text-xs">{error}</p>}

      <div className="sm:col-span-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
        >
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
