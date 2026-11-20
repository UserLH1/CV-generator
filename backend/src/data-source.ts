import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CV } from './entities/CV';
import { Education } from './entities/Education';
import { Experience } from './entities/Experience';
import { Skill } from './entities/Skill';
import { User } from './entities/User';

config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [CV, Education, Experience, Skill, User],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
});
