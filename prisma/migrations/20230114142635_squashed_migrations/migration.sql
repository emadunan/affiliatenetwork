/*
  Warnings:

  - Added the required column `campaignId` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "campaignId" TEXT NOT NULL,
ADD COLUMN     "countries" TEXT[];

-- AlterTable
ALTER TABLE "UserMeta" ALTER COLUMN "reqNumber" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
