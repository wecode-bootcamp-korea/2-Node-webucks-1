-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_coffees_id_fkey`;

-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_users_id_fkey`;

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_coffees_id_fkey` FOREIGN KEY (`coffees_id`) REFERENCES `coffees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
