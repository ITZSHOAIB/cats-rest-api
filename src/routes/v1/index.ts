import { Router } from "express";
import catRouter from "./cat.route";
import authRouter from "./auth.route";

const router = Router();

router.use("/cats", catRouter);
router.use("/auth", authRouter);

export default router;
