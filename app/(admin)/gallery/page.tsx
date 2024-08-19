import { Images } from "lucide-react";

import { Frames } from "@/app/(admin)/gallery/frames";
import { ScrollAriaWrapper } from "@/components/admin/scroll-aria-wrapper";

export const metadata = {
  title: "Адміністрування світлин || ТОВ Покров",
};

export default function AdminGallery() {
  return (
    <div className="md:container h-full">
      <h1 className="md:ml-16 mb-5 flex items-center gap-2">
        <Images size={28} />
        Галерея світлин
      </h1>
      <ScrollAriaWrapper>
        <Frames />
      </ScrollAriaWrapper>
    </div>
  );
}
