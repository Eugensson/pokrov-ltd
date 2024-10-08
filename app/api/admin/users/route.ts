import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const users = await UserModel.find();
  return Response.json(users);
}) as any;
