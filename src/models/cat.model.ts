import mongoose from "mongoose";

export interface ICat {
  name: string;
  breed: string;
  image: string;
}

export type CatDocument = mongoose.Document & ICat;

const catSchema = new mongoose.Schema<CatDocument>({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Cat = mongoose.model<CatDocument>("Cat", catSchema);
