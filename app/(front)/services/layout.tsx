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
    <div className="grid md:grid-cols-5 gap-4 bg-primary-foreground overflow-hidden rounded-md">
      {children}
    </div>
  );
}
