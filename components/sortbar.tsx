"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  sortOrders: string[];
  q: string;
  category: string;
  price: string;
  rating: string;
  sort: string;
  page: string;
  className?: string;
}

export const Sortbar: React.FC<Props> = ({
  sortOrders,
  q,
  category,
  price,
  rating,
  sort,
  page,
  className,
}) => {
  const router = useRouter();

  const getFilterUrl = (s: string) => {
    const params = { q, category, price, rating, sort, page };
    if (s) params.sort = s;
    return `/catalog?${new URLSearchParams(params).toString()}`;
  };

  const handleSelect = (s: string) => {
    router.push(getFilterUrl(s));
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Сортувати за:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Сортувати за:</SelectLabel>
          <SelectSeparator />
          {sortOrders.map((s) => (
            <SelectItem key={s} value={s}>
              {s === "newest"
                ? "новинками"
                : s === "lowest"
                ? "зростанням ціни"
                : s === "highest"
                ? "зниженням ціни"
                : s === "rating"
                ? "рейтингом"
                : ""}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
