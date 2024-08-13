import cloudinary from "cloudinary";

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import FrameModel from "@/lib/models/Frame";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const GET = auth(async (req: any, { params }: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const frame = await FrameModel.findById(params.id);
    if (!frame) {
      return Response.json(
        { message: "Світлину не знайдено" },
        { status: 404 }
      );
    }

    return Response.json(frame);
  } catch (error: any) {
    return Response.json(
      { message: "Помилка при отриманні світлини", error: error.message },
      { status: 500 }
    );
  }
}) as any;

export const PUT = auth(async (req: any, { params }: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      { status: 401 }
    );
  }

  const { title, image, category, description, cat } = await req.json();

  try {
    await dbConnect();

    const frame = await FrameModel.findById(params.id);
    if (!frame) {
      return Response.json(
        { message: "Світлину не знайдено" },
        { status: 404 }
      );
    }

    // Оновлення полів
    frame.title = title;
    frame.image = image;
    frame.category = category;
    frame.cat = cat;
    frame.description = description;

    const updatedFrame = await frame.save();
    return Response.json(updatedFrame);
  } catch (error: any) {
    return Response.json(
      { message: "Помилка при оновленні світлини", error: error.message },
      { status: 500 }
    );
  }
}) as any;

export const DELETE = auth(async (req: any, { params }: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Будь ласка, авторизуйтесь в системі" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const frame = await FrameModel.findById(params.id);

    if (!frame) {
      return Response.json(
        { message: "Світлину не знайдено" },
        { status: 404 }
      );
    }

    const urlParts = frame.image.split("/");

    const fileNameWithExtension = urlParts.pop();

    if (!fileNameWithExtension) {
      throw new Error("Не вдалося витягти fileNameWithExtension з URL");
    }

    const [publicId] = fileNameWithExtension.split(".");
    if (!publicId) {
      throw new Error("Не вдалося витягти publicId з fileNameWithExtension");
    }

    await cloudinary.v2.uploader.destroy(publicId);

    await frame.deleteOne();

    return Response.json({ message: "Світлину успішно видалено" });
  } catch (error: any) {
    return Response.json(
      { message: "Помилка при видаленні світлини", error: error.message },
      { status: 500 }
    );
  }
}) as any;
