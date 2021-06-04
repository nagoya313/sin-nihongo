const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddUcsToKajis1622833350070 {
  name = 'AddUcsToKajis1622833350070';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "kanjis" ADD "ucs" integer NOT NULL`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "kanjis" DROP COLUMN "ucs"`);
  }
};
