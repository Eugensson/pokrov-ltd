import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="container flex flex-col grow py-1 lg:py-2">
        {children}
      </main>
      <Footer />
    </div>
  );
}
