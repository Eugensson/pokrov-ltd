import { NextRequest, NextResponse } from "next/server";

import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/User";
import FrameModel from "@/lib/models/Frame";
import ProductModel from "@/lib/models/Product";

export const GET = async (request: NextRequest) => {
  const { users, products, frames } = data;
  await dbConnect();
  await UserModel.deleteMany();
  await UserModel.insertMany(users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);

  await FrameModel.deleteMany();
  await FrameModel.insertMany(frames);

  return NextResponse.json({
    message: "seeded successfully",
    users,
    products,
    frames,
  });
};
