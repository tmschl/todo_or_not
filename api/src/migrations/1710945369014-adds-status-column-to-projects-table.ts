import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsStatusColumnToProjectsTable1710945369014 implements MigrationInterface {
    name = 'AddsStatusColumnToProjectsTable1710945369014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
    }

}
