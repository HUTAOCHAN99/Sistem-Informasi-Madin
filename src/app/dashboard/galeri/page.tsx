export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import DeleteButton from "@/components/dashboard/DeleteButton";
import EditModal from "@/components/dashboard/EditModal";
import AddPanel from "@/components/dashboard/AddPanel";
import AddGalleryForm from "@/components/dashboard/forms/AddGalleryForm";
import EditGalleryForm from "@/components/dashboard/forms/EditGalleryForm";
import PreviewableImage from "@/components/ui/PreviewableImage";
import { getGalleryItems } from "@/lib/data/gallery";
import { deleteGalleryItem } from "@/lib/actions/gallery";
import { matchQuery } from "@/lib/utils/search";
import { ImageIcon } from "lucide-react";

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const allItems = await getGalleryItems();
  const items = allItems.filter((g) => matchQuery(q, g.caption));

  return (
    <>
      <Topbar title="Galeri" searchPlaceholder="Cari keterangan..." />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/50">
            {items.length} foto
            {q ? ` ditemukan (dari ${allItems.length})` : ""}
          </p>
          <AddPanel label="Tambah Foto">
            <AddGalleryForm />
          </AddPanel>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-xl2 border border-madin-line overflow-hidden"
            >
              <PreviewableImage
                src={g.foto_url}
                alt={g.caption || "Foto galeri"}
                className="w-full aspect-[4/3] object-cover"
                previewClassName="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
              <div className="p-4 flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-madin-navy truncate">
                    {g.caption || <span className="text-black/30 italic">Tanpa keterangan</span>}
                  </p>
                  <p className="text-xs text-black/40 mt-0.5">Urutan: {g.urutan}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <EditModal title="Edit Foto Galeri">
                    <EditGalleryForm item={g} />
                  </EditModal>
                  <DeleteButton
                    action={deleteGalleryItem.bind(null, g.id)}
                    confirmText={`Hapus foto "${g.caption || "ini"}" dari galeri?`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="bg-white rounded-xl2 border border-madin-line p-10 flex flex-col items-center justify-center text-center gap-2">
            <ImageIcon className="w-8 h-8 text-black/20" />
            <p className="text-sm text-black/40">
              {q ? "Tidak ada foto yang cocok dengan pencarian." : "Belum ada foto galeri."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
