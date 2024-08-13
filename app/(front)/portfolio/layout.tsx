import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ТОВ НВФ Покров | Галерея робіт",
  description: "Галерея",
};

const PoryfolioLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex flex-col py-1 md:py-2 xl:py-5">{children}</section>
  );
};

export default PoryfolioLayout;
