/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sizes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[amount]` on the table `sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `sizes_name_key` ON `sizes`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `sizes_amount_key` ON `sizes`(`amount`);
