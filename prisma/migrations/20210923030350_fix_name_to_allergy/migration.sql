/*
  Warnings:

  - You are about to drop the column `name` on the `allergies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[allergy]` on the table `allergies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allergy` to the `allergies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `allergies_name_key` ON `allergies`;

-- AlterTable
ALTER TABLE `allergies` DROP COLUMN `name`,
    ADD COLUMN `allergy` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `allergies_allergy_key` ON `allergies`(`allergy`);
