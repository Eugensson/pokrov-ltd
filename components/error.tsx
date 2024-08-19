import Link from "next/link";
import { RefreshCw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  href: string;
}

export const Error: React.FC<ErrorProps> = ({ href }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <TriangleAlert size={28} className="text-red-500" />
      <h4 className="text-red-500 p-0">Сталася помилка.</h4>
      <h4 className="text-red-500 p-0">Будь ласка, оновіть сторінку.</h4>
      <Button type="button" className="mt-4">
        <Link href={href} className="flex items-center gap-2">
          <RefreshCw size={16} />
          Оновити
        </Link>
      </Button>
    </div>
  );
};
