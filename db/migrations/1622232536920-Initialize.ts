import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1622232536920 implements MigrationInterface {
  name = 'Initialize1622232536920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "radicals" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "number_of_strokes" integer NOT NULL, "names" character varying array NOT NULL, CONSTRAINT "PK_0a50786fef2a9e30c0474c3ee9f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "radicals"`);
  }
}
