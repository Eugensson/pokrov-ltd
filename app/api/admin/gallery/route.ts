import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import FrameModel from "@/lib/models/Frame";

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
  const frames = await FrameModel.find();
  return Response.json(frames);
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

  try {
    await dbConnect();

    const frame = new FrameModel({
      title: "sample title",
      description: "sample description",
      category: "sample category",
      cat: "sample cat",
      image: "/placeholder.jpg",
    });

    await frame.save();
    return Response.json(
      { message: "Світлину створено успішно", frame },
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
