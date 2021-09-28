/*
  Warnings:

  - You are about to drop the column `parent_comment_id` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `parent_comment_id`;
