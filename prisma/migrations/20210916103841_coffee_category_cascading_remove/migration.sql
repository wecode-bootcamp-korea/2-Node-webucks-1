-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_categories_id_fkey`;

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
