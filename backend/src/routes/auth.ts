import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

const authLimit = (limit: number) => rateLimit({
  windowMs: 15 * 60 * 1000,
  limit,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again later.' },
});

router.post('/register', authLimit(8), (req, res, next) => {
  authController.register(req, res).catch(next);
});

router.post('/login', authLimit(15), (req, res, next) => {
  authController.login(req, res).catch(next);
});

export default router;
