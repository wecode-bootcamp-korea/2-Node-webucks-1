-- AlterTable
ALTER TABLE `users` ADD COLUMN `deletedAt` DATETIME(3),
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'active_user';
