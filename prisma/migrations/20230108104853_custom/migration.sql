/*
  Warnings:

  - Added the required column `reqNumber` to the `UserMeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMeta" ADD COLUMN     "reqNumber" INTEGER NOT NULL;
