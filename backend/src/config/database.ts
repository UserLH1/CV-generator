import { ConnectionOptions } from 'typeorm';
import { CV } from '../entities/CV';

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [CV],
};

export default dbConfig;
