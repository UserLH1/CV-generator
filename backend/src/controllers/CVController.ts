import { Request, Response } from 'express';
import database from '../data-source';
import { CV } from '../entities/CV';

const textFields = ['title', 'firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email', 'summary', 'themeColor'] as const;
const relations = { experiences: true, education: true, skills: true } as const;

function fields<T extends string>(body: Record<string, unknown>, names: readonly T[]) {
  const values: Partial<Record<T, string>> = {};
  for (const name of names) {
    if (typeof body?.[name] === 'string') values[name] = body[name];
  }
  return values;
}

function list(value: unknown): Record<string, unknown>[] | undefined {
  return Array.isArray(value) ? value.filter(row => row && typeof row === 'object') : undefined;
}

function cvId(req: Request): string | undefined {
  const id = req.params.id ?? req.body?.id;
  return typeof id === 'string' && /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(id) ? id : undefined;
}

function document(cv: CV) {
  return { ...cv, ownerId: undefined, experience: cv.experiences ?? [] };
}

export class CVController {
  async createCV(req: Request, res: Response) {
    const title = req.body?.title;
    if (typeof title !== 'string' || !title.trim() || title.length > 160) {
      return res.status(400).json({ message: 'Enter a title of up to 160 characters' });
    }
    const repository = database.getRepository(CV);
    const cv = await repository.save(repository.create({ title: title.trim(), ownerId: res.locals.ownerId }));
    return res.status(201).json(document(cv));
  }

  async listCVs(_req: Request, res: Response) {
    const cvs = await database.getRepository(CV).find({ where: { ownerId: res.locals.ownerId } });
    return res.json(cvs.map(document));
  }

  async getCV(req: Request, res: Response) {
    const id = cvId(req);
    const cv = id && await database.getRepository(CV).findOne({ where: { id, ownerId: res.locals.ownerId }, relations });
    return cv ? res.json(document(cv)) : res.status(404).json({ message: 'CV not found' });
  }

  async updateCV(req: Request, res: Response) {
    const id = cvId(req);
    const cv = id && await database.transaction(async manager => {
      const repository = manager.getRepository(CV);
      const current = await repository.findOne({
        where: { id, ownerId: res.locals.ownerId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!current) return null;
      repository.merge(current, fields(req.body, textFields));
      const experience = list(req.body.experience ?? req.body.experiences);
      const education = list(req.body.education);
      const skills = list(req.body.skills);
      if (experience) current.experiences = experience.map(row => ({
        ...fields(row, ['title', 'companyName', 'city', 'state', 'startDate', 'endDate', 'workSummary']),
        currentlyWorking: row.currentlyWorking === true,
      }));
      if (education) current.education = education.map(row => fields(row, ['universityName', 'degree', 'major', 'startDate', 'endDate', 'description']));
      if (skills) current.skills = skills.map(row => ({
        ...fields(row, ['name']),
        rating: Number.isInteger(row.rating) ? Number(row.rating) : 0,
      }));
      await repository.save(current);
      return repository.findOne({ where: { id, ownerId: res.locals.ownerId }, relations });
    });
    return cv ? res.json(document(cv)) : res.status(404).json({ message: 'CV not found' });
  }

  async deleteCV(req: Request, res: Response) {
    const id = cvId(req);
    const result = id && await database.getRepository(CV).delete({ id, ownerId: res.locals.ownerId });
    return result && result.affected ? res.json({ success: true }) : res.status(404).json({ message: 'CV not found' });
  }
}
