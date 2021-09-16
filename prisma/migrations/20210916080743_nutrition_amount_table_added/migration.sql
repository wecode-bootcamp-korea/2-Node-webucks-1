/*
  Warnings:

  - You are about to drop the column `amount` on the `nutritions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `nutritions` DROP COLUMN `amount`;

-- CreateTable
CREATE TABLE `nutrition_amount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` VARCHAR(191) NOT NULL,
    `nutrition_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nutrition_amount` ADD CONSTRAINT `nutrition_amount_nutrition_id_fkey` FOREIGN KEY (`nutrition_id`) REFERENCES `nutritions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
