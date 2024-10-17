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

// Routes
app.use('/api/cv', cvRouter);
app.use('/api/auth', authRouter);  // Use the auth routes


export default app;
