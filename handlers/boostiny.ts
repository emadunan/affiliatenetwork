import { Campaign } from "@prisma/client";
import db from "../lib/prismadb";

export const updateCampaignsData = async (campaignsArr: Campaign[]) => {
  await db.campaign.deleteMany({});

  return await db.campaign.createMany({
    data: campaignsArr
  });
};