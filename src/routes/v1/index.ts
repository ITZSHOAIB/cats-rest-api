import { Router } from "express";
import catRouter from "./cat.route";
import authRouter from "./auth.route";

const router = Router();

router.get("/", (_, res) => {
  res.send("Welcome to the Cat REST API v1!");
});

router.use("/cats", catRouter);
router.use("/auth", authRouter);

export default router;
