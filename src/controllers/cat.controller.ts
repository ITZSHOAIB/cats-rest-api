import catService from "../services/cat.service";
import fs from "fs";
import path from "path";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import { IUserAddedRequest } from "../middlewares/auth";

const uploadCatImage = catchAsync(
  async (req: IUserAddedRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { filename } = req.file;
    const { name, breed } = req.body;
    const userId = req.user;
    const createdCat = await catService.saveCat(
      {
        name,
        breed,
        image: filename,
      },
      userId
    );

    res.status(201).send(createdCat);
  }
);

const getCats = catchAsync(async (req: IUserAddedRequest, res: Response) => {
  const userId = req.user;
  const cats = await catService.findCats(userId);
  res.status(200).send(cats);
});

const getCatById = catchAsync(async (req: IUserAddedRequest, res: Response) => {
  const { id } = req.params;
  const cat = await catService.findCatById(id, req.user);
  if (!cat) {
    return res.status(404).send("Cat not found");
  }
  res.status(200).send(cat);
});

const updateCat = catchAsync(async (req: IUserAddedRequest, res: Response) => {
  const { id } = req.params;
  const { name, breed } = req.body;

  const cat = await catService.findCatById(id, req.user);
  if (!cat) {
    return res.status(404).send("Cat not found");
  }

  let image;
  if (req.file) {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "public/images",
      cat.image
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    image = req.file.filename;
  }

  const updatedCat = await catService.findByIdAndUpdate(id, req.user, {
    name,
    breed,
    image,
  });
  res.status(200).send(updatedCat);
});

const deleteCat = catchAsync(async (req: IUserAddedRequest, res: Response) => {
  const { id } = req.params;
  const cat = await catService.findCatById(id, req.user);
  if (!cat) {
    return res.status(404).send("Cat not found");
  }

  const filePath = path.resolve(
    __dirname,
    "..",
    "..",
    "public/images",
    cat.image
  );
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Image not found");
  }
  fs.unlinkSync(filePath);

  await catService.findByIdAndDelete(id, req.user);
  res.status(204).send();
});

export default {
  uploadCatImage,
  getCats,
  getCatById,
  updateCat,
  deleteCat,
};
