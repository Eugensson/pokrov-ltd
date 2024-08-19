import Link from "next/link";
import Image from "next/image";

import { Rating } from "@/components/rating";
import { convertDocToObj } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@/components/add-to-cart";
import productService from "@/lib/services/productService";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return { title: "Товар не знайдено" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h3>Товар не знайдено.</h3>
        <Button size="lg" variant="link">
          <Link href="/catalog" className="uppercase text-lg">
            До каталогу
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button variant="link" type="button" className="px-0 my-4 mr-auto">
        <Link href="/catalog" className="uppercase text-lg">
          До каталогу
        </Link>
      </Button>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <Image
            priority
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            className="object-cover w-full h-96"
          />
          <ul className="flex justify-between gap-2">
            <li className="bg-primary-foreground rounded-md h-28 flex-1">1</li>
            <li className="bg-primary-foreground rounded-md h-28 flex-1">2</li>
            <li className="bg-primary-foreground rounded-md h-28 flex-1">3</li>
            <li className="bg-primary-foreground rounded-md h-28 flex-1">4</li>
          </ul>
        </div>
        <ul className="space-y-4 lg:col-span-2 bg-primary-foreground rounded-md p-4">
          <li>
            <h1 className="text-xl">{product.name}</h1>
          </li>
          <li>
            <Rating
              value={product.rating}
              caption={`${product.numReviews} ratings`}
            />
          </li>
          <li> {product.brand}</li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            Description: <p>{product.description}</p>
          </li>
        </ul>
        <div className="bg-primary-foreground rounded-md lg:col-span-1 p-4 flex flex-col gap-10">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
          </div>
          {product.countInStock !== 0 && (
            <AddToCart
              item={{
                ...convertDocToObj(product),
                qty: 0,
                color: "",
                size: "",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
