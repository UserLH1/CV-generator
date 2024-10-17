import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CV {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text')
  education: string;

  @Column('text')
  experience: string;

  constructor() {
    this.id = 0; 
    this.name = '';
    this.email = '';
    this.education = '';
    this.experience = '';
  }
}
