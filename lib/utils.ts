import { twMerge } from "tailwind-merge";

import { type ClassValue, clsx } from "clsx";
import { Product } from "@/lib/models/Product";
import { Frame } from "./models/Frame";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const convertDocToObj = (doc: any) => {
  doc._id = doc._id.toString();
  return doc;
};

export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatId = (value: string) => {
  return `..${value.substring(20, 24)}`;
};

export const serializedProducts = (products: Product[]) => {
  if (!products) return [];

  return products.map((product) => {
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toString(),
      updatedAt: product.updatedAt.toString(),
    };
  });
};

export const serializedFrame = (frames: Frame[]) => {
  if (!frames) return [];

  return frames.map((frame) => {
    return {
      ...frame,
      _id: frame._id.toString(),
      createdAt: frame.createdAt.toString(),
      updatedAt: frame.updatedAt.toString(),
    };
  });
};

export const formatDate = (value: string) => {
  const date = new Date(value);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  date.setUTCHours(date.getUTCHours() + 3);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
