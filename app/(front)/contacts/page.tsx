import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";

import Map from "@/components/map";
import { ContactForm } from "./contact-form";

export default function Contact() {
  return (
    <ul className="w-full grid md:grid-cols-2 gap-6 py-2">
      <li className="flex flex-col gap-2 bg-primary-foreground md:px-48 md:py-5 rounded-md">
        <h2 className="flex items-center gap-4 font-semibold py-4 uppercase">
          <PhoneCall />
          Зателефонуйте:
        </h2>
        <Link href="tel:+380965300300" className="hover:text-slate-500">
          +38 096 5 300 300
        </Link>
        <Link href="tel:+380665300300" className="hover:text-slate-500">
          +38 066 5 300 300
        </Link>
        <Link href="tel:+380682300300" className="hover:text-slate-500">
          +38 068 2 300 300
        </Link>
        <h2 className="flex items-center gap-4 font-semibold py-4 uppercase">
          <Mail />
          Напишіть нам:
        </h2>
        <Link href="mailto:pokrov-ltd@ukr.net" className="hover:text-slate-500">
          pokrov-ltd@ukr.net
        </Link>
        <h2 className="flex items-center gap-4 font-semibold py-4 uppercase">
          <MapPin />
          Завітайте до нас:
        </h2>
        <p className="text-sm lg:text-base">18021, Україна,</p>
        <p className="text-sm lg:text-base">Черкаська обл., м. Черкаси,</p>
        <p className="text-sm lg:text-base">вул. Macимa Залізняка, 167</p>
      </li>
      <li className="flex flex-col gap-2 bg-primary-foreground md:px-20 md:py-5 rounded-md">
        <ContactForm />
      </li>
      <li className="bg-primary-foreground md:col-span-2">
        <Map />
      </li>
    </ul>
  );
}
