/*
  Warnings:

  - You are about to drop the column `coffeeId` on the `nutrition_coffee` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionId` on the `nutrition_coffee` table. All the data in the column will be lost.
  - Added the required column `coffee_id` to the `nutrition_coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutrition_id` to the `nutrition_coffee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nutrition_coffee` DROP FOREIGN KEY `nutrition_coffee_coffeeId_fkey`;

-- DropForeignKey
ALTER TABLE `nutrition_coffee` DROP FOREIGN KEY `nutrition_coffee_nutritionId_fkey`;

-- AlterTable
ALTER TABLE `nutrition_coffee` DROP COLUMN `coffeeId`,
    DROP COLUMN `nutritionId`,
    ADD COLUMN `coffee_id` INTEGER NOT NULL,
    ADD COLUMN `nutrition_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `nutrition_coffee` ADD CONSTRAINT `nutrition_coffee_coffee_id_fkey` FOREIGN KEY (`coffee_id`) REFERENCES `coffees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nutrition_coffee` ADD CONSTRAINT `nutrition_coffee_nutrition_id_fkey` FOREIGN KEY (`nutrition_id`) REFERENCES `nutritions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
