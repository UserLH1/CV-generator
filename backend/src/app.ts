import path from 'node:path';
import cors from 'cors';
import express from 'express';
import cvRouter from './routes/cv';
import authRouter from './routes/auth';
import database from './data-source';

const app = express();
app.disable('x-powered-by');
if (process.env.APP_ORIGIN) app.use(cors({ origin: process.env.APP_ORIGIN }));
app.use(express.json({ limit: '256kb' }));
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.get('/api/ready', async (_req, res) => {
  try {
    await database.query('SELECT 1');
    res.json({ status: 'ready' });
  } catch {
    res.status(503).json({ status: 'unavailable' });
  }
});
app.use('/api/auth', authRouter);
app.use('/api/cv', cvRouter);

app.use('/api', (_req, res) => { res.sendStatus(404); });
const staticDir = process.env.STATIC_DIR;
if (staticDir) {
  app.use(express.static(staticDir));
  app.get('*', (_req, res) => { res.sendFile(path.join(staticDir, 'index.html')); });
}

export default app;
