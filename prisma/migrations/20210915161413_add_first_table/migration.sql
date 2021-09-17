/*
  Warnings:

  - You are about to drop the `_AllergyToDrink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AllergyToDrink` DROP FOREIGN KEY `_AllergyToDrink_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_AllergyToDrink` DROP FOREIGN KEY `_AllergyToDrink_ibfk_2`;

-- DropTable
DROP TABLE `_AllergyToDrink`;

-- AddForeignKey
ALTER TABLE `drinks_allergies` ADD CONSTRAINT `drinks_allergies_drink_id_fkey` FOREIGN KEY (`drink_id`) REFERENCES `drinks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drinks_allergies` ADD CONSTRAINT `drinks_allergies_allergy_id_fkey` FOREIGN KEY (`allergy_id`) REFERENCES `allergies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
