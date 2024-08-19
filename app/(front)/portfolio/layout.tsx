import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея || ТОВ Покров",
  description: "Галерея світлин продукції ТОВ Покров",
};

const PoryfolioLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="m-auto flex flex-col py-1 md:py-2 xl:py-5">
      {children}
    </section>
  );
};

export default PoryfolioLayout;
