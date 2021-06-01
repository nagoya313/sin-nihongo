const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateJisLevels1622545856429 {
    name = 'CreateJisLevels1622545856429'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "jis_levels" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, CONSTRAINT "PK_62a56bfaf2e8354293cc15e61b9" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "jis_levels"`);
    }
}
