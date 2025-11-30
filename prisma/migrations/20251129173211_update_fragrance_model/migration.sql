/*
  Warnings:

  - You are about to drop the column `preiere` on the `Fragrance` table. All the data in the column will be lost.
  - Added the required column `premiere` to the `Fragrance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fragrance" DROP COLUMN "preiere",
ADD COLUMN     "premiere" TEXT NOT NULL;
