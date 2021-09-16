/*
  Warnings:

  - Added the required column `src` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `images_main_id_key` ON `images`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `src` VARCHAR(191) NOT NULL,
    MODIFY `main_id` INTEGER;
