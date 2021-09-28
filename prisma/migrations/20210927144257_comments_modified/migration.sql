-- AlterTable
ALTER TABLE `comments` ADD COLUMN `deleted_at` DATETIME(3),
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `parent_comment_id` INTEGER;
