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
    <div className="bg-white rounded-xl2 border border-madin-line p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-lg bg-madin-teal/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-madin-teal" />
      </div>
      <div>
        <p className="text-2xl font-display font-semibold text-madin-navy leading-none">{value}</p>
        <p className="text-xs text-black/50 mt-1">{label}</p>
      </div>
    </div>
  );
}
