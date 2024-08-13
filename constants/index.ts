import {
  Cog,
  Home,
  Images,
  Info,
  List,
  Wrench,
  Facebook,
  Instagram,
  Linkedin,
  UserCheck,
  Truck,
  Banknote,
  FolderCheck,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users2,
  Settings,
} from "lucide-react";

export const navLinks = [
  { label: "Головна", href: "/", icon: Info },
  { label: "Послуги", href: "/services", icon: Wrench },
  { label: "Технологія", href: "/technology", icon: Cog },
  { label: "Каталог", href: "/catalog", icon: List },
  { label: "Галерея", href: "/portfolio", icon: Images },
  { label: "Контакти", href: "/contacts", icon: Home },
];

export const adminNavLinks = [
  { label: "Адмінпанель", href: "/dashboard", icon: LayoutDashboard },
  { label: "Замовлення", href: "/orders", icon: ShoppingCart },
  { label: "Продукція", href: "/products", icon: Package },
  { label: "Користувачі", href: "/customers", icon: Users2 },
  { label: "Галерея", href: "/gallery", icon: Images },
  { label: "Налаштування", href: "/settings", icon: Settings },
];

export const socialLinks = [
  {
    label: "Facebook link",
    href: "https://facebook.com/pokrov.ltd",
    icon: Facebook,
  },
  {
    label: "Instagram link",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  { label: "Linkedin link", href: "https://www.linkedin.com/", icon: Linkedin },
];

export const bannerImages = [
  { id: "1", title: "Світлина Храму", imageURL: "/banner1.jpg" },
  { id: "2", title: "Світлина Храму", imageURL: "/banner2.jpg" },
  { id: "3", title: "Світлина Храму", imageURL: "/banner3.jpg" },
  { id: "4", title: "Світлина Храму", imageURL: "/banner4.jpg" },
  { id: "5", title: "Світлина Храму", imageURL: "/banner5.jpg" },
];

export const servicesImages = [
  {
    id: "1",
    label: "Проектування та виготовлення куполів",
    title: "Купол Храму",
    href: "/services/domes",
    imageURL: "/portfolio/domes.jpg",
  },
  {
    id: "2",
    label: "Проектування та виготовлення накупольних хрестів",
    title: "Процес освячення відкриття Храму",
    href: "/services/cross",
    imageURL: "/portfolio/cross.jpg",
  },
  {
    id: "3",
    label: "Реалізація аркушів із нержавіючої сталі",
    title: "Аркуші з нанесеним покриттям",
    href: "/services/sheets",
    imageURL: "/portfolio/sheets.jpg",
  },
  {
    id: "4",
    label: "Декоративні елементи з нержавіючої сталі",
    title: "Декоративні елементи",
    href: "/services/decor",
    imageURL: "/portfolio/decor.jpg",
  },
];

export const sortOrdersList = ["newest", "lowest", "highest", "rating"];

export const sortPricesList = [
  {
    name: "1 - 1000",
    value: "1-1000",
  },
  {
    name: "1001 - 2000",
    value: "1001-2000",
  },
  {
    name: "2001 - 3000",
    value: "2001-3000",
  },
  {
    name: "3001 - 4000",
    value: "3001-4000",
  },
  {
    name: "4001 - 5000",
    value: "4001-5000",
  },
  {
    name: "5001 - 6000",
    value: "5001-6000",
  },
  {
    name: "6001 - 7000",
    value: "6001-7000",
  },
  {
    name: "7001 - 8000",
    value: "7001-8000",
  },
  {
    name: "8001 - 9000",
    value: "8001-9000",
  },
  {
    name: "9001 - 10000",
    value: "9001-10000",
  },
];

export const ratingsList = [5, 4, 3, 2, 1];

export const stepList = [
  { id: 1, label: "Авторизація", icon: UserCheck },
  { id: 2, label: "Адреса доставки", icon: Truck },
  { id: 3, label: "Спосіб оплати", icon: Banknote },
  { id: 4, label: "Розмістити замовлення", icon: FolderCheck },
];

export const paymentMethods = [
  "PayPal",
  "Оплата кур'єру при доставці",
  "Оплата за реквізитами на р/р",
];

export const breadcrumbItems: Record<
  string,
  { label: string; path: string }[]
> = {
  "/dashboard": [
    { label: "Панель адміністратора", path: "/dashboard" },
    { label: "Статистика", path: "#" },
  ],
  "/products": [
    { label: "Панель адміністратора", path: "/dashboard" },
    { label: "Товари", path: "#" },
  ],
  "/orders": [
    { label: "Панель адміністратора", path: "/dashboard" },
    { label: "Замовлення", path: "#" },
  ],
  "/customers": [
    { label: "Панель адміністратора", path: "/dashboard" },
    { label: "Користувачі", path: "#" },
  ],
  "/gallery": [
    { label: "Панель адміністратора", path: "/dashboard" },
    { label: "Галерея", path: "#" },
  ],
  "/settings": [
    { label: "Панель адміністратора", path: "/dashboard" },
    { label: "Налаштування", path: "#" },
  ],
};
