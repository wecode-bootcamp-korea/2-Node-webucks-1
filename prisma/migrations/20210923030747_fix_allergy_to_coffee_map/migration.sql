/*
  Warnings:

  - You are about to drop the column `allergyId` on the `allergy_coffee` table. All the data in the column will be lost.
  - You are about to drop the column `coffeeId` on the `allergy_coffee` table. All the data in the column will be lost.
  - Added the required column `allergies_id` to the `allergy_coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coffees_id` to the `allergy_coffee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `allergy_coffee` DROP COLUMN `allergyId`,
    DROP COLUMN `coffeeId`,
    ADD COLUMN `allergies_id` INTEGER NOT NULL,
    ADD COLUMN `coffees_id` INTEGER NOT NULL;
