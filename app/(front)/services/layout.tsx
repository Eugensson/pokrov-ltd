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
    <section className="m-auto grid lg:grid-cols-5 overflow-hidden rounded-md p-1">
      {children}
    </section>
  );
}
