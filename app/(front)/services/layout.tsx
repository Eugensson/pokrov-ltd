import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ТОВ НВФ Покров | Послуги",
  description: "Послуги, які надаються компанією",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="m-auto grid lg:grid-cols-5 bg-primary-foreground overflow-hidden rounded-md p-2 md:p-4 xl:p-8">
      {children}
    </section>
  );
}
