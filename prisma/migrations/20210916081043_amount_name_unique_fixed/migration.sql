/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `nutritions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `nutritions_name_key` ON `nutritions`(`name`);
