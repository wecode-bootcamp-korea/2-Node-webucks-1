/*
  Warnings:

  - You are about to drop the column `comment_id` on the `re_comments` table. All the data in the column will be lost.
  - Added the required column `comments_id` to the `re_comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `re_comments` DROP FOREIGN KEY `re_comments_comment_id_fkey`;

-- AlterTable
ALTER TABLE `re_comments` DROP COLUMN `comment_id`,
    ADD COLUMN `comments_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `re_comments` ADD CONSTRAINT `re_comments_comments_id_fkey` FOREIGN KEY (`comments_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
