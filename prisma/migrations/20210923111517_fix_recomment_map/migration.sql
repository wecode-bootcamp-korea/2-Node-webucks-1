/*
  Warnings:

  - You are about to drop the `ReComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ReComment` DROP FOREIGN KEY `ReComment_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `ReComment` DROP FOREIGN KEY `ReComment_userId_fkey`;

-- DropTable
DROP TABLE `ReComment`;

-- CreateTable
CREATE TABLE `re_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `users_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `re_comment` ADD CONSTRAINT `re_comment_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `re_comment` ADD CONSTRAINT `re_comment_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
