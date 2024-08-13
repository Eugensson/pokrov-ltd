import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  SquareX,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rating } from "@/components/rating";
import { Sortbar } from "@/components/sortbar";
import { Button } from "@/components/ui/button";
import { Searchbar } from "@/components/searchbar";
import { ProductCard } from "@/components/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import productServices from "@/lib/services/productService";
import { sortOrdersList, sortPricesList, ratingsList } from "@/constants";

export async function generateMetadata({
  searchParams: { q = "all", category = "all", price = "all", rating = "all" },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== "all" && q !== "") ||
    category !== "all" ||
    rating !== "all" ||
    price !== "all"
  ) {
    return {
      title: `Search ${q !== "all" ? q : ""}
          ${category !== "all" ? ` : Category ${category}` : ""}
          ${price !== "all" ? ` : Price ${price}` : ""}
          ${rating !== "all" ? ` : Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

export default async function Catalog({
  searchParams: {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/catalog?${new URLSearchParams(params).toString()}`;
  };

  const categories = await productServices.getCategories();

  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });

  return (
    <div className="grid md:grid-cols-9 gap-2">
      <aside className="space-y-4 md:col-span-2 px-1 py-2 border-r-2">
        <Searchbar />
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger>Фільтр за категорією</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] w-full pr-4">
                <Link
                  className={`block py-1 hover:text-yellow-500 ${
                    "all" === category && "font-semibold"
                  }`}
                  href={getFilterUrl({ c: "all" })}
                >
                  Всі категорії
                </Link>
                {categories.map((c: string) => (
                  <Link
                    key={c}
                    className={`block py-1 hover:text-yellow-500 ${
                      c === category && "font-semibold"
                    }`}
                    href={getFilterUrl({ c })}
                  >
                    {c}
                  </Link>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Фільтр за ціною, &#8372;</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] w-full pr-4">
                <Link
                  className={`block py-1 hover:text-yellow-500 ${
                    "all" === price && "font-semibold"
                  }`}
                  href={getFilterUrl({ p: "all" })}
                >
                  Будь-яка ціна
                </Link>
                {sortPricesList.map((p) => (
                  <Link
                    key={p.value}
                    href={getFilterUrl({ p: p.value })}
                    className={`block py-1 hover:text-yellow-500 ${
                      p.value === price && "font-semibold"
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="review">
            <AccordionTrigger>Фільтр за відгуками клієнтів</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] w-full pr-4">
                <Link
                  href={getFilterUrl({ r: "all" })}
                  className={`block py-1 hover:text-yellow-500 ${
                    "all" === rating && "font-semibold"
                  }`}
                >
                  Всі
                </Link>
                {ratingsList.map((r) => (
                  <Link
                    key={r}
                    href={getFilterUrl({ r: `${r}` })}
                    className={`block py-1 hover:text-yellow-500 ${
                      `${r}` === rating && "font-semibold"
                    }`}
                  >
                    <Rating value={r}></Rating>
                  </Link>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <div className="md:col-span-7 w-full h-full flex flex-col p-2">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <span className="font-semibold">
              Товарів: {products.length === 0 ? "0" : countProducts}
            </span>
            {q !== "all" && q !== "" && " : " + q}
            {category !== "all" && " : " + category}
            {price !== "all" && " : Ціна: " + price}
            {rating !== "all" && " : Рейтинг: " + rating}
            &nbsp;
            {(q !== "all" && q !== "") ||
            category !== "all" ||
            rating !== "all" ||
            price !== "all" ? (
              <Button size="icon" variant="link">
                <Link href="/catalog">
                  <SquareX />
                </Link>
              </Button>
            ) : null}
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Sortbar
              sortOrders={sortOrdersList}
              q={q}
              category={category}
              price={price}
              rating={rating}
              sort={sort}
              page={page}
            />
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-md text-slate-500"
            >
              <List />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-md text-slate-500"
            >
              <LayoutGrid />
            </Button>
          </div>
        </div>
        {products.length === 0 ? (
          <p className="flex flex-col gap-3 justify-center items-center h-full font-semibold text-center">
            За даними критеріями пошуку не знайдено товарів.
            <span className="text-gray-500">
              Будь ласка, задайте інші критерії пошуку.
            </span>
          </p>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            {pages > 1 && (
              <div className="flex items-center gap-2 my-8 mx-auto">
                {Number(page) > 1 && (
                  <Link
                    href={getFilterUrl({ pg: `${Number(page) - 1}` })}
                    aria-label="Навігація до попередньої сторінки"
                  >
                    <ChevronLeft />
                  </Link>
                )}
                <p className="flex items-center gap-1">
                  {page} <span>/</span> {pages}
                </p>
                {Number(page) < Number(pages) && (
                  <Link
                    href={getFilterUrl({ pg: `${Number(page) + 1}` })}
                    aria-label="Навігація до наступної сторінки"
                  >
                    <ChevronRight />
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
