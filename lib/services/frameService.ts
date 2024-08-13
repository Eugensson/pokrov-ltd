// import { cache } from "react";

// import dbConnect from "@/lib/dbConnect";
// import FrameModel from "@/lib/models/Frame";

// export const getFramesCategory = cache(async () => {
//   await dbConnect();
//   return await FrameModel.find().distinct("category");
// });

// export const getFramesByCategory = cache(
//   async ({ category }: { category: string }) => {
//     await dbConnect();
//     return await FrameModel.find({ category });
//   }
// );

import { cache } from "react";
import dbConnect from "@/lib/dbConnect";
import FrameModel, { Frame } from "@/lib/models/Frame";

export const getFramesCategory = cache(async (): Promise<string[]> => {
  await dbConnect();
  return await FrameModel.find().distinct("cat");
});

export const getFramesByCategory = cache(
  async ({ cat }: { cat: string }): Promise<Frame[]> => {
    await dbConnect();
    return await FrameModel.find({ cat }).lean();
  }
);
