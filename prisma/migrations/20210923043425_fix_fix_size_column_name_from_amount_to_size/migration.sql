/*
  Warnings:

  - You are about to drop the column `amount` on the `sizes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[size]` on the table `sizes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `size` to the `sizes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `sizes_amount_key` ON `sizes`;

-- AlterTable
ALTER TABLE `sizes` DROP COLUMN `amount`,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `sizes_size_key` ON `sizes`(`size`);
