import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Rating } from "@/components/rating";
import { Product } from "@/lib/models/Product";

interface Props {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  return (
    <Card
      className={cn(
        "w-full md:max-w-[325px] bg-slate-100 dark:bg-primary-foreground hover:shadow-lg dark:shadow-slate-500/30",
        className
      )}
    >
      <CardContent className="p-0 overflow-hidden rounded-t-md">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-60"
          />
        </Link>
      </CardContent>
      <CardHeader>
        <CardTitle className="uppercase">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span>{product.description}</span>
          <Rating
            className="mt-2"
            value={product.rating}
            caption={`(${product.numReviews})`}
          />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <span>Ціна, &#8372;</span>
        <span className="font-bold">{product.price}</span>
      </CardFooter>
    </Card>
  );
};
