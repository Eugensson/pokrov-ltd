import cloudinary from "cloudinary";

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/Product";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const product = await ProductModel.findById(params.id);
  if (!product) {
    return Response.json(
      { message: "Продукт не знайдено" },
      {
        status: 404,
      }
    );
  }
  return Response.json(product);
}) as any;

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      {
        status: 401,
      }
    );
  }

  const {
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  } = await req.json();

  try {
    await dbConnect();

    const product = await ProductModel.findById(params.id);
    if (product) {
      product.name = name;
      product.slug = slug;
      product.price = price;
      product.category = category;
      product.image = image;
      product.brand = brand;
      product.countInStock = countInStock;
      product.description = description;

      const updatedProduct = await product.save();
      return Response.json(updatedProduct);
    } else {
      return Response.json(
        { message: "Продукт не знайдено" },
        {
          status: 404,
        }
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();

    const product = await ProductModel.findById(params.id);

    if (!product) {
      return Response.json({ message: "Продукт не знайдено" }, { status: 404 });
    }

    const urlParts = product.image.split("/");

    const fileNameWithExtension = urlParts.pop();

    if (!fileNameWithExtension) {
      throw new Error("Не вдалося витягти fileNameWithExtension з URL");
    }

    const [publicId] = fileNameWithExtension.split(".");
    if (!publicId) {
      throw new Error("Не вдалося витягти publicId з fileNameWithExtension");
    }

    await cloudinary.v2.uploader.destroy(publicId);

    await product.deleteOne();

    return Response.json({ message: "Продукт успішно видалено" });
  } catch (error: any) {
    return Response.json(
      { message: "Помилка при видаленні продукту", error: error.message },
      { status: 500 }
    );
  }
}) as any;
