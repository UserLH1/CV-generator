import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CV } from './CV';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  companyName?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  startDate?: string;

  @Column({ nullable: true })
  endDate?: string;

  @Column({ default: false })
  currentlyWorking?: boolean;

  @Column({ type: 'text' })
  workSummary?: string;

  @ManyToOne(() => CV, (cv) => cv.experiences)
  cv?: CV;
}