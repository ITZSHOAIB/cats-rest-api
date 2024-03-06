import { Cat, CatDocument, ICat } from "../models/cat.model";

const saveCat = async ({ name, breed, image }: ICat): Promise<CatDocument> => {
  const cat = new Cat({
    name,
    breed,
    image,
  });
  await cat.save();
  return cat;
};

const findCats = async (): Promise<CatDocument[]> => {
  const cats = await Cat.find();
  return cats;
};

const findCatById = async (id: string): Promise<CatDocument | null> => {
  const cat = await Cat.findById(id);
  return cat;
};

const findByIdAndDelete = async (id: string): Promise<CatDocument | null> => {
  const cat = await Cat.findByIdAndDelete(id);
  return cat;
};

const findByIdAndUpdate = async (
  id: string,
  { name, breed, image }: Partial<ICat>
): Promise<CatDocument | null> => {
  const updatedCat = await Cat.findByIdAndUpdate(
    id,
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
