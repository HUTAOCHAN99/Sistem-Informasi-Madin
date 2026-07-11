"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  confirmText = "Hapus data ini?",
}: {
  action: () => Promise<void>;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label="Hapus"
        className="p-1.5 rounded-lg text-black/40 hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
