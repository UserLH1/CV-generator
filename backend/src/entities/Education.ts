import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CV } from './CV';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  universityName?: string;

  @Column()
  startDate?: string;

  @Column()
  endDate?: string;

  @Column()
  degree?: string;

  @Column()
  major?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => CV, (cv) => cv.education)
  cv?: CV;
}