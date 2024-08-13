import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/Order";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: "Будь ласка, авторизуйтеся в системі" },
      {
        status: 401,
      }
    );
  }
  const { user } = req.auth;
  await dbConnect();
  try {
    const orders = await OrderModel.find({ user: user._id });
    return Response.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    return Response.json(
      { message: "Сталася помилка під час отримання замовлень" },
      {
        status: 500,
      }
    );
  }
}) as any;
