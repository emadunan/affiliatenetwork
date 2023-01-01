/*
  Warnings:

  - Made the column `category_c` on table `Campaign` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_c` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "category_c" SET NOT NULL,
ALTER COLUMN "title_c" SET NOT NULL;
