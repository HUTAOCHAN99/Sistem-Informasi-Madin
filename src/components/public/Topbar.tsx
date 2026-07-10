import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function Topbar() {
  return (
    <div className="hidden md:block bg-madin-navy text-white/70 text-xs">
      <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-madin-orange" />
            info@madin-diniyah.sch.id
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-madin-orange" />
            +62 812-0000-0000
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="hover:text-madin-orange transition-colors">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-madin-orange transition-colors">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-madin-orange transition-colors">
            <Youtube className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
