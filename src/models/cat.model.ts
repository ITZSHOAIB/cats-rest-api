import mongoose from "mongoose";

export interface ICat {
  name: string;
  breed: string;
  image: string;
  user: mongoose.Types.ObjectId;
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
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Cat = mongoose.model<CatDocument>("Cat", catSchema);
