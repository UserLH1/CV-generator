import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a user entity in the application.
 * 
 * @class User
 * @property {number} id - The unique identifier for the user, automatically generated.
 * @property {string} email - The email address of the user, must be unique and valid.
 * @property {string} password - The password for the user's account.
 * @property {string} name - The name of the user.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  password!: string;


}
