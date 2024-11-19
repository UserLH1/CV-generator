import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CV } from "../entities/CV";

export class CVController {
  async createCV(req: Request, res: Response) {
    const cvRepository = getRepository(CV);
    const newCV = cvRepository.create(req.body);
    await cvRepository.save(newCV);
    return res.json(newCV);
  }

  async getCVsByUser(req: Request, res: Response): Promise<Response> {
    const { email } = req.query;
    const cvRepository = getRepository(CV);

    try {
      const emailStr = Array.isArray(email) ? email[0] : email;
      const cvs = await cvRepository.find({
        where: { email: emailStr as string },
      });
      return res.status(200).json(cvs);
    } catch (error) {
      console.error("Error fetching CVs:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
