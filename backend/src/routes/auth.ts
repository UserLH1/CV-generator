import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

import { Request, Response } from 'express';

router.post('/register', async (req: Request, res: Response) => {
	  console.log('Register route hit');

	try {
		await authController.register(req, res);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).send(error.message);
		} else {
			res.status(500).send('An unknown error occurred');
		}
	}
});

router.post('/login', async (req: Request, res: Response) => {
	try {
		await authController.login(req, res);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).send(error.message);
		} else {
			res.status(500).send('An unknown error occurred');
		}
	}
});

export default router;
