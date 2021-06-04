const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class ChangeNotNullNumberOfStrokesToKanjis1622834004908 {
  name = 'ChangeNotNullNumberOfStrokesToKanjis1622834004908';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "kanjis" ALTER COLUMN "number_of_strokes" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "kanjis" ALTER COLUMN "number_of_strokes_in_radical" SET NOT NULL`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "kanjis" ALTER COLUMN "number_of_strokes_in_radical" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "kanjis" ALTER COLUMN "number_of_strokes" DROP NOT NULL`);
  }
};
