import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class AuthController {

  //register a new user
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


  //login a user
   async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userRepository = getRepository(User);

    try {
      // Check if the user exists
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',  // Use an environment variable for secret in production
        { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}


