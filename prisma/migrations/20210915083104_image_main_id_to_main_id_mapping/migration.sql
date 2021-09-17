/*
  Warnings:

  - You are about to drop the column `mainId` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[main_id]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `main_id` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `images_mainId_key` ON `images`;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `mainId`,
    ADD COLUMN `main_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `images_main_id_key` ON `images`(`main_id`);
