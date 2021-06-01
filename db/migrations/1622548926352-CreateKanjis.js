const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateKanjis1622548926352 {
  name = 'CreateKanjis1622548926352';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "kanjis" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "regular" boolean NOT NULL, "for_name" boolean NOT NULL, "number_of_strokes" integer, "number_of_strokes_in_radical" integer, "radical_id" integer NOT NULL, "jis_level" integer, "onyomis" character varying array NOT NULL DEFAULT '{}', "kunyomis" character varying array NOT NULL DEFAULT '{}', "glyph_id" character varying, CONSTRAINT "PK_8e78ee1013404e83f127cf475f2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "kanjis" ADD CONSTRAINT "FK_4d839a38f33f0cd22b05b936439" FOREIGN KEY ("radical_id") REFERENCES "radicals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "kanjis" DROP CONSTRAINT "FK_4d839a38f33f0cd22b05b936439"`);
    await queryRunner.query(`DROP TABLE "kanjis"`);
  }
};
