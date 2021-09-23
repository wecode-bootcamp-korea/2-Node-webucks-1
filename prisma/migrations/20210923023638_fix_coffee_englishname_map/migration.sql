/*
  Warnings:

  - You are about to drop the column `englishName` on the `coffees` table. All the data in the column will be lost.
  - You are about to drop the column `koreanName` on the `coffees` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `coffees` table. All the data in the column will be lost.
  - You are about to drop the column `coffee_id` on the `nutrition_coffee` table. All the data in the column will be lost.
  - Added the required column `english_name` to the `coffees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `korean_name` to the `coffees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coffees_id` to the `nutrition_coffee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `coffees` DROP FOREIGN KEY `coffees_sizeId_fkey`;

-- DropForeignKey
ALTER TABLE `nutrition_coffee` DROP FOREIGN KEY `nutrition_coffee_coffee_id_fkey`;

-- AlterTable
ALTER TABLE `coffees` DROP COLUMN `englishName`,
    DROP COLUMN `koreanName`,
    DROP COLUMN `sizeId`,
    ADD COLUMN `english_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `korean_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `sizes_id` INTEGER;

-- AlterTable
ALTER TABLE `nutrition_coffee` DROP COLUMN `coffee_id`,
    ADD COLUMN `coffees_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_sizes_id_fkey` FOREIGN KEY (`sizes_id`) REFERENCES `sizes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nutrition_coffee` ADD CONSTRAINT `nutrition_coffee_coffees_id_fkey` FOREIGN KEY (`coffees_id`) REFERENCES `coffees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
