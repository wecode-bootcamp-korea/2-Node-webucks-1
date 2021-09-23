/*
  Warnings:

  - You are about to drop the `allergyToCoffee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `allergies` DROP FOREIGN KEY `allergies_allergy_coffee_id_fkey`;

-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_allergy_coffee_id_fkey`;

-- DropTable
DROP TABLE `allergyToCoffee`;

-- CreateTable
CREATE TABLE `allergy_coffee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `allergyId` INTEGER NOT NULL,
    `coffeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_allergy_coffee_id_fkey` FOREIGN KEY (`allergy_coffee_id`) REFERENCES `allergy_coffee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergies` ADD CONSTRAINT `allergies_allergy_coffee_id_fkey` FOREIGN KEY (`allergy_coffee_id`) REFERENCES `allergy_coffee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
