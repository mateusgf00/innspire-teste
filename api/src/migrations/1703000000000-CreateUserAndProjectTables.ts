import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1703000000000 implements MigrationInterface {
    name = 'InitialMigration1703000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('hero', 'admin')
        `);

        await queryRunner.query(`
            CREATE TYPE "public"."users_character_enum" AS ENUM(
                'marvel_spiderman', 'marvel_ironman', 'marvel_captain_america', 
                'marvel_thor', 'marvel_hulk', 'marvel_black_widow',
                'dc_batman', 'dc_superman', 'dc_wonder_woman', 
                'dc_flash', 'dc_green_lantern', 'dc_aquaman'
            )
        `);

        await queryRunner.query(`
            CREATE TYPE "public"."projects_status_enum" AS ENUM('pending', 'in_progress', 'completed')
        `);

        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "email" character varying(150) NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'hero',
                "character" "public"."users_character_enum",
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "projects" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(200) NOT NULL,
                "description" text NOT NULL,
                "status" "public"."projects_status_enum" NOT NULL DEFAULT 'pending',
                "agilityGoal" integer NOT NULL DEFAULT '0',
                "enchantmentGoal" integer NOT NULL DEFAULT '0',
                "efficiencyGoal" integer NOT NULL DEFAULT '0',
                "excellenceGoal" integer NOT NULL DEFAULT '0',
                "transparencyGoal" integer NOT NULL DEFAULT '0',
                "ambitionGoal" integer NOT NULL DEFAULT '0',
                "agilityProgress" integer NOT NULL DEFAULT '0',
                "enchantmentProgress" integer NOT NULL DEFAULT '0',
                "efficiencyProgress" integer NOT NULL DEFAULT '0',
                "excellenceProgress" integer NOT NULL DEFAULT '0',
                "transparencyProgress" integer NOT NULL DEFAULT '0',
                "ambitionProgress" integer NOT NULL DEFAULT '0',
                "startDate" date,
                "endDate" date,
                "responsibleId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "projects" 
            ADD CONSTRAINT "FK_projects_responsibleId" 
            FOREIGN KEY ("responsibleId") 
            REFERENCES "users"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_projects_responsibleId"`);
        
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "users"`);
        
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_character_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
