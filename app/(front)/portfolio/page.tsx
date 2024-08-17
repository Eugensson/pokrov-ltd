import Link from "next/link";
import Image from "next/image";

import { getFramesCategory } from "@/lib/services/frameService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Portfolio() {
  const frames = await getFramesCategory();
  if (!frames) return;

  return (
    <div>
      <h1 className="text-center pt-0 mb-4">Галерея робіт</h1>
      <ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {frames.map((frame) => (
          <li key={frame}>
            <Link href={`/portfolio/${frame}`} className="group">
              <Card className="group-hover:shadow-lg group-hover:dark:shadow-slate-500/50">
                <CardContent className="p-0">
                  <Image
                    src={
                      frame === "cross"
                        ? "/portfolio/cross.jpg"
                        : frame === "sheets"
                        ? "/portfolio/sheets.jpg"
                        : frame === "decor"
                        ? "/portfolio/decor.jpg"
                        : "/portfolio/domes.jpg"
                    }
                    alt="Card Image"
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full h-60"
                  />
                </CardContent>
                <CardHeader>
                  <CardTitle>
                    {frame === "cross"
                      ? "Хрести накупольні"
                      : frame === "sheets"
                      ? "Аркуші із покриттям"
                      : frame === "decor"
                      ? "Декоративні елементи"
                      : "Куполи церковні"}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
