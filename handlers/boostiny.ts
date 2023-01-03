import db from "../lib/prismadb";

export const updateCampaignsData = async (campaignsArr: any[]) => {
  await db.campaign.deleteMany({
    where: {
      network_name: "boostiny"
    }
  });

  return await db.campaign.createMany({
    data: campaignsArr
  });
};