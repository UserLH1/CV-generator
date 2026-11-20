import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1795170000748 implements MigrationInterface {
    name = 'InitialSchema1795170000748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "companyName" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying, "currentlyWorking" boolean NOT NULL DEFAULT false, "workSummary" text NOT NULL, "cvId" uuid, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" SERIAL NOT NULL, "universityName" character varying NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying NOT NULL, "degree" character varying NOT NULL, "major" character varying NOT NULL, "description" text, "cvId" uuid, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rating" integer NOT NULL, "cvId" uuid, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" integer NOT NULL, "title" character varying, "firstName" character varying, "lastName" character varying, "jobTitle" character varying, "address" character varying, "phone" character varying, "email" character varying, "summary" character varying, "themeColor" character varying, CONSTRAINT "PK_4ddf7891daf83c3506efa503bb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_027a6e80c4011387b65d8f654e4" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_5f14cc76c59d7a30e5b8b1ce3d8" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_762b79bed6fe5c8ff134b72e796" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_762b79bed6fe5c8ff134b72e796"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_5f14cc76c59d7a30e5b8b1ce3d8"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_027a6e80c4011387b65d8f654e4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cv"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "experience"`);
    }

}
