import { Campaign } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { updateCampaignsData } from "../../../handlers/boostiny";

const boostinyApiKey = process.env.BOOSTINY_API_KEY as string;
const boostinyApiUrl = process.env.BOOSTINY_API_URL as string;

// Boostiny API Endpoints
// https://api.boostiny.com/publisher/campaigns
// https://api.boostiny.com/publisher/performance
// https://api.boostiny.com/publisher/link-performance

type Data = string | { name: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { page } = req.query;
    const response = await fetch(`${boostinyApiUrl}/publisher/campaigns?page=${page || 1}`, {
      headers: {
        Authorization: boostinyApiKey,
      },
    });

    if (!response.ok)
      return res.status(400).json("Couldn't fetch campaigns data!");

    const campaigns = await response.json();

    res.status(200).json(campaigns);
  } else if (req.method === "PATCH") {
    let allCampaigns: any[];

    const { page } = req.query;
    const response = await fetch(`${boostinyApiUrl}/publisher/campaigns?page=${page || 1}`, {
      headers: {
        Authorization: boostinyApiKey,
      },
    });

    if (!response.ok)
      return res.status(400).json(response.statusText);

    const result = await response.json();

    allCampaigns = result.payload.data;

    const pages = Math.ceil(result.payload.pagination.total / result.payload.pagination.perPage);

    for (let i = 2; i <= pages; i++) {
      const response = await fetch(`${boostinyApiUrl}/publisher/campaigns?page=${i || 1}`, {
        headers: {
          Authorization: boostinyApiKey,
        },
      });

      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      allCampaigns = [...allCampaigns, ...result.payload.data];
    }

    const cleanedCampaigns = allCampaigns.map((campaign: any): Campaign => ({
      id: campaign.id.toString(),
      title: campaign.name,
      category: campaign.category,
      desc: campaign.campaign_description.description,
    }));

    await updateCampaignsData(cleanedCampaigns);

    res.status(200).json("Boostiny campaigns have been updated sucessfully");
  }
}
