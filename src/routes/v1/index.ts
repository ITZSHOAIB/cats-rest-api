import { Router } from "express";
import catRouter from "./cat.route";

const router = Router();

router.use("/cats", catRouter);

export default router;
