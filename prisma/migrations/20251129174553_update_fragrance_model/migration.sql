/*
  Warnings:

  - You are about to drop the column `reviews` on the `Fragrance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fragrance" DROP COLUMN "reviews",
ADD COLUMN     "reviewsAmount" INTEGER NOT NULL DEFAULT 0;
