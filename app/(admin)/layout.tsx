import { AdminAside } from "@/components/admin/admin-aside";
import { AdminHeader } from "@/components/admin/admin-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
        <ScrollArea className="md:container md:m-auto md:ml-16 w-full max-w-[300px] md:max-w-[700px] lg:max-w-[955px] xl:max-w-[1375px] h-full max-h-[450px] lg:max-h-[500px] xl:max-h-[550px] whitespace-nowrap">
          <div className="md:container">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
