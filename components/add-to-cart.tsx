"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { OrderItem } from "@/lib/models/Order";
import { Button } from "@/components/ui/button";
import useCartService from "@/lib/hooks/useCartStore";
import { cn } from "@/lib/utils";

interface Props {
  item: OrderItem;
  className?: string;
}

export const AddToCart: React.FC<Props> = ({ item, className }) => {
  const { items, increase, decrease } = useCartService();

  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => decrease(existItem)}
      >
        <Minus size={18} />
      </Button>

      <span className="px-2">{existItem.qty}</span>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => increase(existItem)}
      >
        <Plus size={18} />
      </Button>
    </div>
  ) : (
    <Button
      type="button"
      size="lg"
      onClick={addToCartHandler}
      className="w-full"
    >
      Додати в кошик
    </Button>
  );
};
