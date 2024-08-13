"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export const Searchbar: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";

  return (
    <form
      action="/catalog"
      method="GET"
      className={cn("relative flex w-full max-w-sm items-center", className)}
    >
      <Input
        defaultValue={q === "all" ? "" : q}
        name="q"
        type="text"
        placeholder="Пошук..."
        className="pl-12"
      />
      <Button
        type="submit"
        size="icon"
        variant="link"
        className="absolute left-2 top-1/2 -translate-y-1/2"
      >
        <Search size={20} aria-label="Search" className="text-slate-500" />
      </Button>
    </form>
  );
};
