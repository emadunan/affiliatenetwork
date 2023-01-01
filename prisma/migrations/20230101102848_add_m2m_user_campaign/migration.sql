-- CreateTable
CREATE TABLE "UserCampaigns" (
    "userId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "UserCampaigns_pkey" PRIMARY KEY ("userId","campaignId")
);

-- AddForeignKey
ALTER TABLE "UserCampaigns" ADD CONSTRAINT "UserCampaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCampaigns" ADD CONSTRAINT "UserCampaigns_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
