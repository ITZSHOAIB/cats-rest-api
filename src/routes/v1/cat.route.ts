import { Router } from "express";
import catsController from "../../controllers/cat.controller";
import upload from "../../middlewares/upload";

const router = Router();

router.post("/upload", upload.single("image"), catsController.uploadCatImage);
router.get("/", catsController.getCats);
router.get("/:id", catsController.getCatById);
router.patch("/:id", upload.single("image"), catsController.updateCat);
router.delete("/:id", catsController.deleteCat);

export default router;
