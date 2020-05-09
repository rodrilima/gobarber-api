import {MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export default class RelationUserAppointments1587328803579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
        "appointments",
        new TableForeignKey({
            name: "set_user_to_provider",
            columnNames: ["provider_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("appointments", "set_user_to_provider")
    }

}
