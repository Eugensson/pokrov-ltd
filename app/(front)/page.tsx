import { bannerImages } from "@/constants";
import { Slider } from "@/components/slider";
import { serializedProducts } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import productService from "@/lib/services/productService";
import { Assurance } from "@/components/sections/assurance";
import { Preference } from "@/components/sections/preference";

export default async function Home() {
  const latestProducts = await productService.getLatest();
  const featuredProducts = await productService.getFeatured();
  const latestSerializedProducts = serializedProducts(latestProducts);
  const featuredSerializedProducts = serializedProducts(featuredProducts);

  return (
    <>
      <Slider images={bannerImages} className="cursor-pointer" />
      <Separator className="hidden md:block md:my-2 lg:my-3 xl:my-4" />
      <Preference />
      <Separator className="my-1 md:my-2 lg:my-3 xl:my-4" />
      <Services />
      <Separator className="my-1 md:my-2 lg:my-3 xl:my-4" />
      <Products
        featuredProducts={latestSerializedProducts}
        latestProducts={featuredSerializedProducts}
      />
      <Separator className="my-1 md:my-2 lg:my-3 xl:my-4" />
      <Assurance />
    </>
  );
}
