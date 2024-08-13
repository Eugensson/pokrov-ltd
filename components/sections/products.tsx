import { cn } from "@/lib/utils";
import { Product } from "@/lib/models/Product";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface Props {
  featuredProducts: Product[];
  latestProducts: Product[];
  className?: string;
}

export const Products: React.FC<Props> = ({ featuredProducts, className }) => {
  return (
    <section
      className={cn("py-4 md:py-8 bg-primary-foreground rounded-md", className)}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Наша продукція</h2>

        <p className="mt-4 text-primary xl:text-xl">
          TOB &quot;НВФ &quot;Покров&quot; спеціалізується на напиленні
          нітрид-титану на різноманіьні вироби. Таке покриття допоможе зберегти
          продукцію в найкращому вигляді, забезпечуючи стійкість до корозії та
          зносу, а також створюючи естетичний вигляд. Звертаючись до нас ви
          отримаєту найкращі рішення для вашого бізнесу!
        </p>
      </div>
      <InfiniteMovingCards
        items={featuredProducts}
        className="mt-8"
        speed="normal"
      />
    </section>
  );
};
