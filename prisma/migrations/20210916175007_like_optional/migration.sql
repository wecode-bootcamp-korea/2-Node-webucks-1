-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_coffees_id_fkey`;

-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `comments_likes` DROP FOREIGN KEY `comments_likes_comments_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments_likes` DROP FOREIGN KEY `comments_likes_users_id_fkey`;

-- AlterTable
ALTER TABLE `coffees_likes` MODIFY `userId` INTEGER,
    MODIFY `coffees_id` INTEGER;

-- AlterTable
ALTER TABLE `comments_likes` MODIFY `users_id` INTEGER,
    MODIFY `comments_id` INTEGER;

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_coffees_id_fkey` FOREIGN KEY (`coffees_id`) REFERENCES `coffees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_likes` ADD CONSTRAINT `comments_likes_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_likes` ADD CONSTRAINT `comments_likes_comments_id_fkey` FOREIGN KEY (`comments_id`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
