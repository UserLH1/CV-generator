import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;

    const userRepository = getRepository(User);

    try {
      // Check if user already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before savingnpm
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        email,
        password: hashedPassword,
        name
      });

      await userRepository.save(newUser);

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}
