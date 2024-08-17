import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="Логотип ТОВ НВФ Покров"
        width={96}
        height={96}
        className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18"
      />
    </Link>
  );
};
