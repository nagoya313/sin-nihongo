const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class ChangeTypeIdToKanjis1622833554583 {
  name = 'ChangeTypeIdToKanjis1622833554583';

  async up(queryRunner) {
    await queryRunner.query(`CREATE SEQUENCE "kanjis_id_seq" OWNED BY "kanjis"."id"`);
    await queryRunner.query(`ALTER TABLE "kanjis" ALTER COLUMN "id" SET DEFAULT nextval('kanjis_id_seq')`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "kanjis" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "kanjis_id_seq"`);
  }
};
