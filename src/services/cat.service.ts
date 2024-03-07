import { Cat, CatDocument, ICat } from "../models/cat.model";

const saveCat = async (
  { name, breed, image }: Omit<ICat, "user">,
  userId: string
): Promise<CatDocument> => {
  const cat = new Cat({
    name,
    breed,
    image,
    user: userId,
  });
  await cat.save();
  return cat;
};

const findCats = async (userId: string): Promise<CatDocument[]> => {
  const cats = await Cat.find({ user: userId });
  return cats;
};

const findCatById = async (
  id: string,
  userId: string
): Promise<CatDocument | null> => {
  const cat = await Cat.findOne({ _id: id, user: userId });
  return cat;
};

const findByIdAndDelete = async (
  id: string,
  userId: string
): Promise<CatDocument | null> => {
  const cat = await Cat.findByIdAndDelete(id, { user: userId });
  return cat;
};

const findByIdAndUpdate = async (
  id: string,
  userId: string,
  { name, breed, image }: Partial<Omit<ICat, "user">>
): Promise<CatDocument | null> => {
  const updatedCat = await Cat.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: { name, breed, image } },
    {
      new: true,
    }
  );
  return updatedCat;
};

export default {
  saveCat,
  findCats,
  findCatById,
  findByIdAndDelete,
  findByIdAndUpdate,
};
