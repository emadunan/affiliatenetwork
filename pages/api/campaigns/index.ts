import { NextApiRequest, NextApiResponse } from "next";
import { getAllCampaigns } from "../../../handlers/campaigns";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const campaigns = await getAllCampaigns();
    res.status(200).json(campaigns);
  };
}