"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface PreviewableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  previewClassName?: string;
}

export default function PreviewableImage({
  className,
  previewClassName,
  alt,
  src,
  ...props
}: PreviewableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <img
        {...props}
        src={src}
        alt={alt}
        className={`${className ?? ""} ${"cursor-zoom-in"}`.trim()}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-6"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            aria-label="Tutup preview"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative flex max-h-[85vh] max-w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              className={`${previewClassName ?? "max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"}`.trim()}
            />
          </div>
        </div>
      )}
    </>
  );
}
