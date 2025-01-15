import { Request, Response, Router } from "express";
import { CVController } from "../controllers/CVController";

const router = Router();
const cvController = new CVController();

router.post("/createCV", async (req: Request, res: Response) => {
  try {
    await cvController.createCV(req, res);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/getCVs", async (req: Request, res: Response) => {
  try {
    await cvController.getCVsByUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/getCV/:id", async (req: Request, res: Response) => {
  try {
    await cvController.getCVById(req, res);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/updateCV", async (req: Request, res: Response) => {
  try {
    await cvController.updateCV(req, res);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
