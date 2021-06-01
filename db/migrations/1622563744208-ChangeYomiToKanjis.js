const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ChangeYomiToKanjis1622563744208 {
    name = 'ChangeYomiToKanjis1622563744208'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "kanjis" DROP COLUMN "onyomis"`);
        await queryRunner.query(`ALTER TABLE "kanjis" DROP COLUMN "kunyomis"`);
        await queryRunner.query(`ALTER TABLE "kanjis" ADD "onyomi" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "kanjis" ADD "kunyomi" character varying array NOT NULL DEFAULT '{}'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "kanjis" DROP COLUMN "kunyomi"`);
        await queryRunner.query(`ALTER TABLE "kanjis" DROP COLUMN "onyomi"`);
        await queryRunner.query(`ALTER TABLE "kanjis" ADD "kunyomis" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "kanjis" ADD "onyomis" character varying array NOT NULL DEFAULT '{}'`);
    }
}
