import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/Product";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const product = new ProductModel({
    name: "sample name",
    slug: "sample-name-" + Math.random(),
    image: "/placeholder.jpg",
    price: 0,
    category: "sample category",
    brand: "sample brand",
    countInStock: 0,
    description: "sample description",
    rating: 0,
    numReviews: 0,
  });
  try {
    await product.save();
    return Response.json(
      { message: "Продукт створено успішно", product },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;
