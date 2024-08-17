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
        className="w-12 h-12 xl:w-20 xl:h-20"
      />
    </Link>
  );
};
