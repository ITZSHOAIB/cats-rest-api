import Cat from "../models/cat.model";

const saveCat = async (name: string, breed: string, image: string) => {
  const cat = new Cat({
    name,
    breed,
    image,
  });
  await cat.save();
  return cat;
};

const findCats = async () => {
  const cats = await Cat.find();
  return cats;
};

const findCatById = async (id: string) => {
  const cat = await Cat.findById(id);
  return cat;
};

const findByIdAndDelete = async (id: string) => {
  const cat = await Cat.findByIdAndDelete(id);
  return cat;
};

// find by id and update cat
const findByIdAndUpdate = async (
  id: string,
  { name, breed, image }: { name?: string; breed?: string; image?: string }
) => {
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
