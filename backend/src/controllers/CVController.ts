import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { CV } from '../entities/CV';

export class CVController {
  async createCV(req: Request, res: Response) {
    const cvRepository = getRepository(CV);
    const newCV = cvRepository.create(req.body);
    await cvRepository.save(newCV);
    return res.json(newCV);
  }

  async getCV(req: Request, res: Response) {
    const cvRepository = getRepository(CV);
    const cvs = await cvRepository.find();
    return res.json(cvs);
  }
}
