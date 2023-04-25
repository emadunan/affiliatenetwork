-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_couponId_fkey";

-- AlterTable
ALTER TABLE "Performance" ALTER COLUMN "campaignId" DROP NOT NULL,
ALTER COLUMN "couponId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
