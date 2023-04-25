/*
  Warnings:

  - You are about to drop the column `campaign_id` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the column `code_id` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the column `full_count` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `ad_set` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aov` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaignId` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponId` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_type` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month_number` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_currency` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "campaign_id",
DROP COLUMN "code_id",
DROP COLUMN "full_count",
ADD COLUMN     "ad_set" TEXT NOT NULL,
ADD COLUMN     "aov" TEXT NOT NULL,
ADD COLUMN     "campaignId" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "couponId" TEXT NOT NULL,
ADD COLUMN     "customer_type" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "month_number" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "original_currency" TEXT NOT NULL,
ALTER COLUMN "last_fetched_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
