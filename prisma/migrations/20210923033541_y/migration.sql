/*
  Warnings:

  - You are about to drop the column `nutrition_id` on the `nutrition_coffee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `nutritions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nutriion]` on the table `nutritions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutritions_id` to the `nutrition_coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutriion` to the `nutritions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nutrition_coffee` DROP FOREIGN KEY `nutrition_coffee_nutrition_id_fkey`;

-- DropIndex
DROP INDEX `nutritions_name_key` ON `nutritions`;

-- AlterTable
ALTER TABLE `nutrition_coffee` DROP COLUMN `nutrition_id`,
    ADD COLUMN `nutritions_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `nutritions` DROP COLUMN `name`,
    ADD COLUMN `nutriion` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `nutritions_nutriion_key` ON `nutritions`(`nutriion`);

-- AddForeignKey
ALTER TABLE `nutrition_coffee` ADD CONSTRAINT `nutrition_coffee_nutritions_id_fkey` FOREIGN KEY (`nutritions_id`) REFERENCES `nutritions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
