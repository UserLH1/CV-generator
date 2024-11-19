// import 'reflect-metadata';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { CV } from './CV';

// @Entity()
// export class CVField {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   fieldName: string;

//   @Column()
//   fieldValue: string;

//   @ManyToOne(() => CV, (cv) => cv.fields, { onDelete: 'CASCADE' })
//   cv: CV;

//   constructor() {
//     this.id = '';
//     this.fieldName = '';
//     this.fieldValue = '';
//     this.cv = new CV();
//   }
// }
