import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-madin-cream">
      <Sidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
