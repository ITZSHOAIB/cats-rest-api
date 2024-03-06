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

/**
 * @swagger
 * tags:
 *   name: Cats
 *   description: Cats management and retrieval
 */

/**
 * @swagger
 * /v1/cats:
 *   get:
 *     summary: Get all cats
 *     tags: [Cats]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cat'
 */

/**
 * @swagger
 * /v1/cats/upload:
 *   post:
 *     summary: Upload a cat image
 *     tags: [Cats]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the cat
 *               breed:
 *                 type: string
 *                 description: The breed of the cat
 *               image:
 *                 type: file
 *                 description: The image of the cat
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 */

/**
 * @swagger
 * /v1/cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The ID of the cat
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 *       404:
 *         description: Cat not found
 */

/**
 * @swagger
 * /v1/cats/{id}:
 *   patch:
 *     summary: Update a cat by ID
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The ID of the cat
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the cat
 *               breed:
 *                 type: string
 *                 description: The breed of the cat
 *               image:
 *                 type: file
 *                 description: The image of the cat
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 *       404:
 *         description: Cat not found
 */

/**
 * @swagger
 * /v1/cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The ID of the cat
 *     responses:
 *       204:
 *         description: Success
 *       404:
 *         description: Cat not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    Cat:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The ID of the cat
 *        name:
 *          type: string
 *          description: The name of the cat
 *        breed:
 *          type: string
 *          description: The breed of the cat
 *        image:
 *          type: string
 *          description: The fil name of the cat's image
 */
