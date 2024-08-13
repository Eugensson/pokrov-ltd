import { Schema, model, models } from "mongoose";

const frameSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    cat: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FrameModel = models.Frame || model("Frame", frameSchema);

export default FrameModel;

export type Frame = {
  _id: string;
  title?: string;
  description?: string;
  category: string;
  cat: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
