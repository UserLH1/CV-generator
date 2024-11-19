import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CV {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title: string; 

  @Column()
  email: string;

  constructor() {
    this.title = '';
    this.email = '';
  }
}
