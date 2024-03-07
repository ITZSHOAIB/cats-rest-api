import { RequestHandler, Router } from "express";
import catsController from "../../controllers/cat.controller";
import upload from "../../middlewares/upload";
import { verifyToken } from "../../middlewares/auth";

const router = Router();

router.post(
  "/upload",
  verifyToken as RequestHandler,
  upload.single("image"),
  catsController.uploadCatImage
);
router.get("/", verifyToken as RequestHandler, catsController.getCats);
router.get("/:id", verifyToken as RequestHandler, catsController.getCatById);
router.patch(
  "/:id",
  verifyToken as RequestHandler,
  upload.single("image"),
  catsController.updateCat
);
router.delete("/:id", verifyToken as RequestHandler, catsController.deleteCat);

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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *        user:
 *          type: string
 *          description: The owner of the cat
 *        image:
 *          type: string
 *          description: The fil name of the cat's image
 */

/**
 * @swagger
 * components:
 *   securitySchema:
 *     bearerAuth:
 *       type: http
 *       schema: beaer
 *       bearerFormat: JWT
 *       in: header
 */
