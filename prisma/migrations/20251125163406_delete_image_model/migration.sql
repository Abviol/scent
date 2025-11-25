/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_fragranceId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_variantId_fkey";

-- AlterTable
ALTER TABLE "Fragrance" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "FragranceVariant" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "Image";
