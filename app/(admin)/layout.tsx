import { AdminAside } from "@/components/admin/admin-aside";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <AdminAside />
      <div className="flex flex-col w-full h-full gap-2">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
