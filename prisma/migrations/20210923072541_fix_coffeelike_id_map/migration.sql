/*
  Warnings:

  - You are about to drop the column `userId` on the `coffees_likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[users_id,coffees_id]` on the table `coffees_likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `coffees_likes` DROP FOREIGN KEY `coffees_likes_userId_fkey`;

-- DropIndex
DROP INDEX `coffees_likes_userId_coffees_id_key` ON `coffees_likes`;

-- AlterTable
ALTER TABLE `coffees_likes` DROP COLUMN `userId`,
    ADD COLUMN `users_id` INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX `coffees_likes_users_id_coffees_id_key` ON `coffees_likes`(`users_id`, `coffees_id`);

-- AddForeignKey
ALTER TABLE `coffees_likes` ADD CONSTRAINT `coffees_likes_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
