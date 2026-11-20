import database from './data-source';
import app from './app';

async function start() {
  if (!process.env.DATABASE_URL || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('DATABASE_URL and a JWT_SECRET of at least 32 characters are required');
  }

  await database.initialize();
  await database.runMigrations();
  app.listen(Number(process.env.PORT || 5000));
}

start().catch(() => {
  console.error('CV Generator could not start. Verify configuration and database migrations.');
  process.exit(1);
});
