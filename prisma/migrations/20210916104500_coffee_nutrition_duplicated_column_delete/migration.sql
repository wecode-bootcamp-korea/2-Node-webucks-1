/*
  Warnings:

  - You are about to drop the `_CoffeeToNutrition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CoffeeToNutrition` DROP FOREIGN KEY `_coffeetonutrition_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CoffeeToNutrition` DROP FOREIGN KEY `_coffeetonutrition_ibfk_2`;

-- DropTable
DROP TABLE `_CoffeeToNutrition`;
