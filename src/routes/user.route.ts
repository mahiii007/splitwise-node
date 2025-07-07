import { Router, Request, Response } from "express";
const router = Router();

// Health check endpoint
router.get("/", (_req: Request, res: Response) => {
  //   throw new Error("dasnsaknd");
  res.status(200).json({ msg: "user fetched successfully" });
});

export { router as userRouter };
