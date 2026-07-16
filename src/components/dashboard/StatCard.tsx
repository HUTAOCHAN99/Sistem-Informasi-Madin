import { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-white rounded-xl2 border border-madin-line p-4 sm:p-5 flex items-center gap-3 sm:gap-4 min-w-0">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-madin-teal/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-madin-teal" />
      </div>
      <div className="min-w-0">
        <p
          className="text-lg sm:text-2xl font-display font-semibold text-madin-navy leading-tight sm:leading-none truncate"
          title={String(value)}
        >
          {value}
        </p>
        <p className="text-xs text-black/50 mt-1 truncate">{label}</p>
      </div>
    </div>
  );
}
