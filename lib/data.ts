import bcrypt from "bcryptjs";
import { title } from "process";

const data = {
  users: [
    {
      name: "Admin Admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "User User",
      email: "user@user.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Product 1",
      slug: "product-1",
      category: "Накупольні хрести",
      image: "/products/cross1.jpg",
      price: 1000,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 8,
      countInStock: 10,
      description: "A popular product",
      isFeatured: true,
      banner: "/banner1.jpg",
    },
    {
      name: "Product 2",
      slug: "product-2",
      category: "Декоративні елементи",
      image: "/products/decor1.jpg",
      price: 4000,
      brand: "Brand 2",
      rating: 5.0,
      numReviews: 10,
      countInStock: 2,
      description: "A popular product",
      isFeatured: true,
      banner: "/banner2.jpg",
    },
    {
      name: "Product 3",
      slug: "product-3",
      category: "Аркуші із нанесеним покриттям",
      image: "/products/sheets1.jpg",
      price: 6000,
      brand: "Brand 3",
      rating: 5.0,
      numReviews: 2,
      countInStock: 5,
      description: "A popular product",
      isFeatured: true,
      banner: "/banner3.jpg",
    },
    {
      name: "Product 4",
      slug: "product-4",
      category: "Куполи церковні",
      image: "/products/dome1.jpg",
      price: 2000,
      brand: "Brand 4",
      rating: 3.5,
      numReviews: 1,
      countInStock: 15,
      description: "A popular product",
      isFeatured: true,
      banner: "/banner4.jpg",
    },
    {
      name: "Product 5",
      slug: "product-5",
      category: "Накупольні хрести",
      image: "/products/cross2.jpg",
      price: 1500,
      brand: "Brand 3",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
      banner: "/banner5.jpg",
    },
    {
      name: "Product 6",
      slug: "product-6",
      category: "Декоративні елементи",
      image: "/products/decor2.jpg",
      price: 1700,
      brand: "Brand 3",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 7",
      slug: "product-7",
      category: "Куполи церковні",
      image: "/products/dome2.jpg",
      price: 1800,
      brand: "Brand 2",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 8",
      slug: "product-8",
      category: "Накупольні хрести",
      image: "/products/cross3.jpg",
      price: 3400,
      brand: "Brand 4",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 9",
      slug: "product-9",
      category: "Декоративні елементи",
      image: "/products/decor3.jpg",
      price: 1900,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 10",
      slug: "product-10",
      category: "Куполи церковні",
      image: "/products/dome3.jpg",
      price: 9000,
      brand: "Brand 4",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 11",
      slug: "product-11",
      category: "Накупольні хрести",
      image: "/products/cross4.jpg",
      price: 3700,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 12",
      slug: "product-12",
      category: "Декоративні елементи",
      image: "/products/decor4.jpg",
      price: 6300,
      brand: "Brand 2",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 13",
      slug: "product-13",
      category: "Куполи церковні",
      image: "/products/dome4.jpg",
      price: 4400,
      brand: "Brand 4",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 14",
      slug: "product-14",
      category: "Накупольні хрести",
      image: "/products/cross5.jpg",
      price: 2200,
      brand: "Brand 3",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 15",
      slug: "product-15",
      category: "Декоративні елементи",
      image: "/products/decor5.jpg",
      price: 3700,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 16",
      slug: "product-16",
      category: "Куполи церковні",
      image: "/products/dome5.jpg",
      price: 2100,
      brand: "Brand 2",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 17",
      slug: "product-17",
      category: "Накупольні хрести",
      image: "/products/cross6.jpg",
      price: 1200,
      brand: "Brand 2",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 18",
      slug: "product-18",
      category: "Декоративні елементи",
      image: "/products/decor6.jpg",
      price: 1100,
      brand: "Brand 3",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
    {
      name: "Product 19",
      slug: "product-19",
      category: "Куполи церковні",
      image: "/products/dome6.jpg",
      price: 5600,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 6,
      countInStock: 1,
      description: "A popular product",
      isFeatured: true,
    },
  ],

  frames: [
    {
      title: "Купол церковний 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773887/Gallery/3_ljywl7.jpg",
    },
    {
      title: "Купол церковний 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773886/Gallery/2_ltaotu.jpg",
    },
    {
      title: "Купол церковний 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773885/Gallery/1_h6jboj.jpg",
    },
    {
      title: "Купол церковний 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773884/Gallery/11_qhmew2.jpg",
    },
    {
      title: "Купол церковний 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773882/Gallery/10_hn8khc.jpg",
    },
    {
      title: "Купол церковний 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773881/Gallery/9_y6kkbi.jpg",
    },
    {
      title: "Купол церковний 7",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773880/Gallery/8_qpadvc.jpg",
    },
    {
      title: "Купол церковний 8",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773879/Gallery/7_inoei4.jpg",
    },
    {
      title: "Купол церковний 9",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Куполи церковні",
      cat: "domes",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773877/Gallery/5_fl7wpo.jpg",
    },
    {
      title: "Хрест накупольний 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774639/Gallery/10_ynbgx5.jpg",
    },
    {
      title: "Хрест накупольний 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774637/Gallery/9_kv6dj4.jpg",
    },
    {
      title: "Хрест накупольний 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774636/Gallery/8_i9ddnx.jpg",
    },
    {
      title: "Хрест накупольний 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774634/Gallery/7_w7qg5i.jpg",
    },
    {
      title: "Хрест накупольний 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774633/Gallery/6_olclhk.jpg",
    },
    {
      title: "Хрест накупольний 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774631/Gallery/5_aoh7bf.jpg",
    },
    {
      title: "Хрест накупольний 7",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774630/Gallery/4_jn0iux.jpg",
    },
    {
      title: "Хрест накупольний 8",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774628/Gallery/3_n2joil.jpg",
    },
    {
      title: "Хрест накупольний 9",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774627/Gallery/1_jfx3e0.jpg",
    },
    {
      title: "Хрест накупольний 10",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774626/Gallery/2_cqshug.jpg",
    },
    {
      title: "Хрест накупольний 11",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Накупольні хрести",
      cat: "cross",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712773888/Gallery/4_pdk0ez.jpg",
    },
    {
      title: "Декоративні елементи 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774919/Gallery/1_rtxqku.jpg",
    },
    {
      title: "Декоративні елементи 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774921/Gallery/2_zbcz36.jpg",
    },
    {
      title: "Декоративні елементи 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774923/Gallery/3_i8qkdd.jpg",
    },
    {
      title: "Декоративні елементи 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774925/Gallery/4_yslavd.jpg",
    },
    {
      title: "Декоративні елементи 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774927/Gallery/5_ogsuif.jpg",
    },
    {
      title: "Декоративні елементи 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774928/Gallery/6_gsbkad.jpg",
    },
    {
      title: "Декоративні елементи 7",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774930/Gallery/7_n74yrf.jpg",
    },
    {
      title: "Декоративні елементи 8",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774932/Gallery/8_vqloii.jpg",
    },
    {
      title: "Декоративні елементи 9",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774934/Gallery/9_b95bme.jpg",
    },
    {
      title: "Декоративні елементи 10",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Декоративні елементи",
      cat: "decor",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712774935/Gallery/10_iezifu.jpg",
    },
    {
      title: "Аркуші з нанесеним покриттям 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Аркуші із нанесеним покриттям",
      cat: "sheets",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712775088/Gallery/4_ic5lxd.jpg",
    },
    {
      title: "Аркуші з нанесеним покриттям 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Аркуші із нанесеним покриттям",
      cat: "sheets",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712775086/Gallery/3_ljkeqw.jpg",
    },
    {
      title: "Аркуші з нанесеним покриттям 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Аркуші із нанесеним покриттям",
      cat: "sheets",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712775084/Gallery/2_hhjjwl.jpg",
    },
    {
      title: "Аркуші з нанесеним покриттям 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti nihil nemo qui cupiditate explicabo, libero assumenda.",
      category: "Аркуші із нанесеним покриттям",
      cat: "sheets",
      image:
        "https://res.cloudinary.com/dbwzfevx3/image/upload/v1712775082/Gallery/1_yfeso9.jpg",
    },
  ],
};

export default data;
