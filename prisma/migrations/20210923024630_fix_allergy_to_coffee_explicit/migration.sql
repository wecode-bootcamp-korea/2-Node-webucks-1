/*
  Warnings:

  - You are about to drop the `_AllergyToCoffee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AllergyToCoffee` DROP FOREIGN KEY `_allergytocoffee_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_AllergyToCoffee` DROP FOREIGN KEY `_allergytocoffee_ibfk_2`;

-- AlterTable
ALTER TABLE `allergies` ADD COLUMN `allergy_coffee_id` INTEGER;

-- AlterTable
ALTER TABLE `coffees` ADD COLUMN `allergy_coffee_id` INTEGER;

-- DropTable
DROP TABLE `_AllergyToCoffee`;

-- CreateTable
CREATE TABLE `allergyToCoffee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `allergyId` INTEGER NOT NULL,
    `coffeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_allergy_coffee_id_fkey` FOREIGN KEY (`allergy_coffee_id`) REFERENCES `allergyToCoffee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergies` ADD CONSTRAINT `allergies_allergy_coffee_id_fkey` FOREIGN KEY (`allergy_coffee_id`) REFERENCES `allergyToCoffee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
