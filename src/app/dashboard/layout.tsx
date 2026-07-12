import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    redirect("/login?next=/dashboard");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-madin-cream">
      <Sidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
