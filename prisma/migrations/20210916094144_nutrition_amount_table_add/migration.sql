/*
  Warnings:

  - You are about to drop the `nutrition_amount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `nutrition_amount` DROP FOREIGN KEY `nutrition_amount_nutrition_id_fkey`;

-- DropTable
DROP TABLE `nutrition_amount`;

-- CreateTable
CREATE TABLE `NutritionAmount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` VARCHAR(191) NOT NULL,
    `nutritionId` INTEGER NOT NULL,
    `coffeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NutritionAmount` ADD CONSTRAINT `NutritionAmount_coffeeId_fkey` FOREIGN KEY (`coffeeId`) REFERENCES `coffees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionAmount` ADD CONSTRAINT `NutritionAmount_nutritionId_fkey` FOREIGN KEY (`nutritionId`) REFERENCES `nutritions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
