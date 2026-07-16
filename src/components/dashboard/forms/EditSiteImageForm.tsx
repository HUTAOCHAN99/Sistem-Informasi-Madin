"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, RotateCcw, ImageOff } from "lucide-react";
import PreviewableImage from "@/components/ui/PreviewableImage";
import { updateSiteImage, resetSiteImage, type SiteImageKey } from "@/lib/actions/settings";

export default function EditSiteImageForm({
  imageKey,
  title,
  description,
  currentUrl,
  defaultHint,
}: {
  imageKey: SiteImageKey;
  title: string;
  description: string;
  currentUrl: string | null;
  defaultHint: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [uploading, setUploading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pending = uploading || resetting;

  async function handleReset() {
    if (!confirm(`Kembalikan foto ${title.toLowerCase()} ke bawaan?`)) return;
    setError(null);
    setResetting(true);
    try {
      await resetSiteImage(imageKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus foto.");
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl2 border border-madin-line p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-madin-navy">{title}</h3>
          <p className="text-sm text-black/50 mt-1">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {currentUrl ? (
          <PreviewableImage
            src={currentUrl}
            alt={title}
            className="w-28 h-20 rounded-lg object-cover border border-madin-line shrink-0"
            previewClassName="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        ) : (
          <div className="w-28 h-20 rounded-lg border border-dashed border-madin-line bg-madin-cream flex items-center justify-center shrink-0">
            <ImageOff className="w-5 h-5 text-black/25" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs text-black/40">
            {currentUrl ? "Foto kustom sedang tampil." : `Belum ada foto kustom. ${defaultHint}`}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <form
              ref={formRef}
              action={async (formData) => {
                setError(null);
                setUploading(true);
                try {
                  await updateSiteImage(imageKey, formData);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Gagal mengunggah foto.");
                } finally {
                  setUploading(false);
                  if (formRef.current) formRef.current.reset();
                }
              }}
            >
              <label
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors ${
                  pending
                    ? "text-black/30 border-madin-line cursor-wait"
                    : "text-madin-teal border-madin-teal/30 hover:bg-madin-teal/10 cursor-pointer"
                }`}
              >
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Camera className="w-3.5 h-3.5" />
                )}
                {currentUrl ? "Ganti Foto" : "Unggah Foto"}
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

            {currentUrl && (
              <button
                type="button"
                onClick={handleReset}
                disabled={pending}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors ${
                  pending
                    ? "text-black/30 border-madin-line cursor-wait"
                    : "text-black/50 border-madin-line hover:bg-madin-cream cursor-pointer"
                }`}
              >
                {resetting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5" />
                )}
                Pakai Bawaan
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}
