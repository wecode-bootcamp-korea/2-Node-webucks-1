/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_categories_id_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    DROP COLUMN `key`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
