-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_categories_id_fkey`;

-- AlterTable
ALTER TABLE `coffees` MODIFY `categories_id` INTEGER;

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
