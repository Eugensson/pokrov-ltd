import bcrypt from "bcryptjs";

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json(
      { message: "Будь ласка, увійдіть в систему" },
      { status: 401 }
    );
  }
  const { user } = req.auth;
  const { name, email, password } = await req.json();
  await dbConnect();
  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      return Response.json(
        { message: "Користувача не знайдено" },
        {
          status: 404,
        }
      );
    }
    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password;
    await dbUser.save();
    return Response.json({ message: "Користувача оновлено" });
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;
