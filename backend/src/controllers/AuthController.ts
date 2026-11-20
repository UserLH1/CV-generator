import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import database from '../data-source';
import { User } from '../entities/User';

// Keep password verification work similar for unknown and existing accounts.
const dummyPasswordHash = bcrypt.hashSync('unused-auth-placeholder', 10);

export class AuthController {

  //register a new user
  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+[.][^\s@]+$/.test(email) || typeof name !== 'string' || !name.trim() || typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password) > 72) {
      return res.status(400).json({ message: 'Enter a valid email, name and password of at least 8 characters' });
    }

    const userRepository = database.getRepository(User);

    try {
      // Check if user already exists
      const existingUser = await userRepository.findOne({ where: { email: email.trim().toLowerCase() } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before savingnpm
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        email: email.trim().toLowerCase(),
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
    if (typeof email !== 'string' || typeof password !== 'string' || Buffer.byteLength(password) > 72) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userRepository = database.getRepository(User);

    try {
      // Check if the user exists
      const user = await userRepository.findOne({ where: { email: email.trim().toLowerCase() } });
      const isPasswordValid = await bcrypt.compare(password, user?.password ?? dummyPasswordHash);
      if (!user || !isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,  // Use an environment variable for secret in production
        { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}


