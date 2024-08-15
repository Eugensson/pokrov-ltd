import { AdminAside } from "@/components/admin/admin-aside";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminAside />
      <div className="flex flex-col sm:gap-4">
        <AdminHeader />
        <div className="container sm:py-4 sm:pl-14">{children}</div>
      </div>
    </main>
  );
}
