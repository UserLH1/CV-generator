import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { CVController } from '../controllers/CVController';

const router = Router();
const controller = new CVController();

router.use((req, res, next) => {
  const token = req.get('Authorization')?.match(/^Bearer (\S+)$/i)?.[1];
  if (token) {
    try {
      const identity = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] });
      if (typeof identity !== 'string' && Number.isSafeInteger(identity.id) && identity.id > 0) {
        res.locals.ownerId = identity.id;
        return next();
      }
    } catch {
      // Expired and invalid sessions require a new sign-in.
    }
  }
  res.status(401).json({ message: 'Sign in to access your CVs' });
});

type Handler = (req: Request, res: Response) => Promise<unknown>;
function handle(handler: Handler) {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch {
      res.status(500).json({ message: 'Unable to complete the CV request' });
    }
  };
}

router.post('/createCV', handle(controller.createCV));
router.get('/getCVs', handle(controller.listCVs));
router.get(['/getCV/:id', '/:id'], handle(controller.getCV));
router.put(['/updateCV', '/updateCV/:id', '/:id'], handle(controller.updateCV));
router.delete('/deleteCV/:id', handle(controller.deleteCV));

export default router;
