/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_categories_id_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `key` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`key`);

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`key`) ON DELETE SET NULL ON UPDATE CASCADE;
