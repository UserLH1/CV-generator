import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Experience } from './Experience';
import { Education } from './Education';
import { Skill } from './Skill';

@Entity()
export class CV {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  jobTitle?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  summary?: string;

  @Column({ nullable: true })
  themeColor?: string;

  @OneToMany(() => Experience, (exp) => exp.cv, { cascade: true })
  experiences?: Experience[];

  @OneToMany(() => Education, (edu) => edu.cv, { cascade: true })
  education?: Education[];

  @OneToMany(() => Skill, (skill) => skill.cv, { cascade: true })
  skills?: Skill[];
}