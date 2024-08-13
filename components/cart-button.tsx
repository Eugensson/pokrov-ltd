"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCartService from "@/lib/hooks/useCartStore";

export const CartButton = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button variant="outline" className=" rounded-md">
      <Link href="/cart" className="flex items-center gap-1">
        <ShoppingCart
          size={20}
          aria-label="Shopping cart"
          className="text-slate-500"
        />
        {mounted && items.length != 0 ? (
          <Badge variant="outline" className="text-sm text-slate-500">
            {items.reduce((a, c) => a + c.qty, 0)}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-sm text-slate-500">
            0
          </Badge>
        )}
      </Link>
    </Button>
  );
};
