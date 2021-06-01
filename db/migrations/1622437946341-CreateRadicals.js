const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateRadicals1622437946341 {
  name = 'CreateRadicals1622437946341';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "radicals" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "number_of_strokes" integer NOT NULL, "names" character varying array NOT NULL, CONSTRAINT "PK_0a50786fef2a9e30c0474c3ee9f" PRIMARY KEY ("id"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "radicals"`);
  }
};
