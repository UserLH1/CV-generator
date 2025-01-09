import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CV } from './CV';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  rating?: number;

  @ManyToOne(() => CV, (cv) => cv.skills)
  cv?: CV;
}