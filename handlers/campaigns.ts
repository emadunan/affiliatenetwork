import { CampaignWithUser } from "@prisma/client/scalar";
import db from "../lib/prismadb";

export async function getAllCampaigns() {
  return await db.campaign.findMany();
}

export async function getAllCampaignWithStatus(): Promise<CampaignWithUser[]> {
  return await db.campaign.findMany({
    include: {
      userCampaigns: true,
    }
  });
}

export async function assignCampaignToUser(userId: string, campaignId: string) {
  return await db.userCampaigns.create({
    data: {
      userId,
      campaignId,
      status: "pending",
    }
  })
}