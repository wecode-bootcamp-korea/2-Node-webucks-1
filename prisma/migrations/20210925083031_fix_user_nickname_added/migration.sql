/*
  Warnings:

  - A unique constraint covering the columns `[nick_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_coffees_id_fkey`;

-- AlterTable
ALTER TABLE `comments` MODIFY `users_id` INTEGER,
    MODIFY `coffees_id` INTEGER;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `nick_name` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `users_nick_name_key` ON `users`(`nick_name`);

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_coffees_id_fkey` FOREIGN KEY (`coffees_id`) REFERENCES `coffees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
