import { config } from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

config(); // Load environment variables from .env file

createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,  // Connection string from your .env
  synchronize: true,              // Set to false in production
  logging: true,
  entities: ['src/entities/*.ts'], // Path to your entities
  ssl: {                          // Enable SSL (usually required for Neon)
    rejectUnauthorized: false
  }
})
  .then(() => {
    console.log('Connected to the database');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('Database connection error:', error));
