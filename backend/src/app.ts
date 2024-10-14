import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cvRouter from '../src/routes/cv';
import 'reflect-metadata';

const app = express();

// Middlewares
app.use(cors());
app.use(json());

// Routes
app.use('/api/cv', cvRouter);

export default app;
