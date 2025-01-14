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

  public async updateCV(req: Request, res: Response) {
    try {
      const { id, ...cvData } = req.body;
      console.log("body request:", req.body);
      console.log("cvData: ", cvData);
      console.log("id cv current: ", id);
      const cvRepository = getRepository(CV);
      const existingCV = await cvRepository.findOne({ where: { id } });
      if (!existingCV) {
        return res.status(404).json({ message: "CV not found" });
      }
      cvRepository.merge(existingCV, cvData);
      const savedCV = await cvRepository.save(existingCV);
      return res.json(savedCV);
    } catch (error) {
      return res.status(500).json({ error: "Error updating CV" });
    }
  }

  public async getCVById(req: Request, res: Response) {
    const { id } = req.params;
    const cvRepository = getRepository(CV);
    const cv = await cvRepository.findOne({ where: { id } });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    return res.json(cv);
  }

}
