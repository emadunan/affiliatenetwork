import db from "../lib/prismadb";

export async function getAllCampaigns() {
  return await db.campaign.findMany();
}