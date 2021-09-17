/*
  Warnings:

  - You are about to drop the `NutritionAmount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `NutritionAmount` DROP FOREIGN KEY `NutritionAmount_coffeeId_fkey`;

-- DropForeignKey
ALTER TABLE `NutritionAmount` DROP FOREIGN KEY `NutritionAmount_nutritionId_fkey`;

-- DropTable
DROP TABLE `NutritionAmount`;

-- CreateTable
CREATE TABLE `nutrition_coffee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` VARCHAR(191) NOT NULL,
    `nutritionId` INTEGER NOT NULL,
    `coffeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nutrition_coffee` ADD CONSTRAINT `nutrition_coffee_coffeeId_fkey` FOREIGN KEY (`coffeeId`) REFERENCES `coffees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nutrition_coffee` ADD CONSTRAINT `nutrition_coffee_nutritionId_fkey` FOREIGN KEY (`nutritionId`) REFERENCES `nutritions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
