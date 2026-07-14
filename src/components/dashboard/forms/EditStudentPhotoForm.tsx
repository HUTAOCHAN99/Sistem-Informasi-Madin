"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import PreviewableImage from "@/components/ui/PreviewableImage";
import { updateStudentPhoto } from "@/lib/actions/students";

function initials(name: string) {
  const parts = name.trim().split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function EditStudentPhotoForm({
  studentId,
  fotoUrl,
  nama,
}: {
  studentId: string;
  fotoUrl: string | null;
  nama: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <form
        ref={formRef}
        action={async (formData) => {
          setError(null);
          setPending(true);
          try {
            await updateStudentPhoto(studentId, formData);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal mengunggah foto.");
          } finally {
            setPending(false);
            if (formRef.current) formRef.current.reset();
          }
        }}
        className="flex items-center gap-2"
      >
        {fotoUrl ? (
          <PreviewableImage
            src={fotoUrl}
            alt={nama}
            className="w-10 h-10 rounded-full object-cover"
            previewClassName="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-madin-teal/10 text-madin-teal text-xs font-display font-semibold flex items-center justify-center">
            {initials(nama)}
          </div>
        )}

        <label
          className={`p-1.5 rounded-lg transition-colors ${
            pending
              ? "text-black/20 cursor-wait"
              : "text-black/40 hover:text-madin-teal hover:bg-madin-teal/10 cursor-pointer"
          }`}
          title="Ubah foto"
        >
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          <input
            type="file"
            name="foto"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            disabled={pending}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                formRef.current?.requestSubmit();
              }
            }}
          />
        </label>
      </form>
      {error && <p className="text-red-600 text-xs mt-1 max-w-[10rem]">{error}</p>}
    </div>
  );
}
