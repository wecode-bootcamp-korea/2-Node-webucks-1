/*
  Warnings:

  - You are about to alter the column `amount` on the `nutritions` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `amount` on the `sizes` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `nutritions` MODIFY `amount` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sizes` MODIFY `amount` VARCHAR(191) NOT NULL;
