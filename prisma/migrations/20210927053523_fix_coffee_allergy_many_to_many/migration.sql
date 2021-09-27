/*
  Warnings:

  - You are about to drop the column `allergy_coffee_id` on the `allergies` table. All the data in the column will be lost.
  - You are about to drop the column `allergy_coffee_id` on the `coffees` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `allergies` DROP FOREIGN KEY `allergies_allergy_coffee_id_fkey`;

-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_allergy_coffee_id_fkey`;

-- AlterTable
ALTER TABLE `allergies` DROP COLUMN `allergy_coffee_id`;

-- AlterTable
ALTER TABLE `coffees` DROP COLUMN `allergy_coffee_id`;

-- AddForeignKey
ALTER TABLE `allergy_coffee` ADD CONSTRAINT `allergy_coffee_allergies_id_fkey` FOREIGN KEY (`allergies_id`) REFERENCES `allergies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergy_coffee` ADD CONSTRAINT `allergy_coffee_coffees_id_fkey` FOREIGN KEY (`coffees_id`) REFERENCES `coffees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
