import { Router, Request, Response } from 'express';
import { CVController } from '../controllers/CVController';

const router = Router();
const cvController = new CVController();

router.post('/', async (req: Request, res: Response) => {
  try {
    await cvController.createCV(req, res);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await cvController.getCV(req, res);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;
