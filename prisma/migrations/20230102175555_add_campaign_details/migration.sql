/*
  Warnings:

  - You are about to drop the column `desc` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `campaignCategory` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `campaignName` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `network` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `campaign_manager` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaign_type` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network_id` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network_name` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_manager` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coupon` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "desc",
ADD COLUMN     "campaign_manager" TEXT NOT NULL,
ADD COLUMN     "campaign_type" TEXT NOT NULL,
ADD COLUMN     "desc_creatives" TEXT,
ADD COLUMN     "desc_description" TEXT,
ADD COLUMN     "desc_dos_and_donts" TEXT,
ADD COLUMN     "desc_promotion" TEXT,
ADD COLUMN     "desc_website_url" TEXT,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "network_id" TEXT NOT NULL,
ADD COLUMN     "network_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "campaignCategory",
DROP COLUMN "campaignName",
DROP COLUMN "code",
DROP COLUMN "network",
DROP COLUMN "source",
ADD COLUMN     "account_manager" TEXT NOT NULL,
ADD COLUMN     "coupon" TEXT NOT NULL,
ADD COLUMN     "start_date" TEXT NOT NULL;
