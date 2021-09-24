/*
  Warnings:

  - Made the column `users_id` on table `coffees_likes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coffees_id` on table `coffees_likes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_coffees_id_fkey`;

-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_users_id_fkey`;

-- AlterTable
ALTER TABLE `coffees_likes` MODIFY `users_id` INTEGER NOT NULL,
    MODIFY `coffees_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_coffees_id_fkey` FOREIGN KEY (`coffees_id`) REFERENCES `coffees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
