import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import cvRouter from '../src/routes/cv';
import authRouter from './routes/auth'; // Import the auth route


const app = express();

// Middlewares
app.use(cors());
app.use(json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/cv', cvRouter);
app.use('/api/auth', authRouter);  // Use the auth routes


export default app;
