const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddUcsIndexToKanjis1622837653732 {
  name = 'AddUcsIndexToKanjis1622837653732';

  async up(queryRunner) {
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_72ad1737dd540847f892dd6dd2" ON "kanjis" ("ucs") `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP INDEX "IDX_72ad1737dd540847f892dd6dd2"`);
  }
};
