/*
  Warnings:

  - You are about to drop the column `nutriion` on the `nutritions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nutrient]` on the table `nutritions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutrient` to the `nutritions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `nutritions_nutriion_key` ON `nutritions`;

-- AlterTable
ALTER TABLE `nutritions` DROP COLUMN `nutriion`,
    ADD COLUMN `nutrient` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `nutritions_nutrient_key` ON `nutritions`(`nutrient`);
