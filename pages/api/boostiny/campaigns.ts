import { Campaign } from "@prisma/client";
import { CampaignWithCoupons } from "@prisma/client/scalar";
import type { NextApiRequest, NextApiResponse } from "next";
import { updateCampaignsDataMod } from "../../../handlers/boostiny";

const boostinyApiKey = process.env.BOOSTINY_API_KEY as string;
const boostinyApiUrl = process.env.BOOSTINY_API_URL as string;

// Boostiny API Endpoints
// https://api.boostiny.com/publisher/campaigns
// https://api.boostiny.com/publisher/performance
// https://api.boostiny.com/publisher/link-performance

type Data =
  | {
      newCampaigns: Campaign[];
      expiredCampaigns: Campaign[];
    }
  | { errMsg: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { page } = req.query;
    const response = await fetch(
      `${boostinyApiUrl}/publisher/campaigns?page=${page || 1}`,
      {
        headers: {
          Authorization: boostinyApiKey,
        },
      }
    );

    if (!response.ok)
      return res.status(400).json({ errMsg: "Couldn't fetch campaigns data!" });

    const campaigns = await response.json();

    res.status(200).json(campaigns);
  } else if (req.method === "PATCH") {
    let allCampaigns: any[];

    const { page } = req.query;
    const response = await fetch(
      `${boostinyApiUrl}/publisher/campaigns?page=${page || 1}`,
      {
        headers: {
          Authorization: boostinyApiKey,
        },
      }
    );

    if (!response.ok)
      return res.status(400).json({ errMsg: response.statusText });

    const result = await response.json();

    allCampaigns = result.payload.data;

    const pages = Math.ceil(
      result.payload.pagination.total / result.payload.pagination.perPage
    );

    for (let i = 2; i <= pages; i++) {
      const response = await fetch(
        `${boostinyApiUrl}/publisher/campaigns?page=${i || 1}`,
        {
          headers: {
            Authorization: boostinyApiKey,
          },
        }
      );

      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      allCampaigns = [...allCampaigns, ...result.payload.data];
    }

    const transformedCampaigns = allCampaigns.map(
      (campaign: any): Partial<CampaignWithCoupons> => {
        return {
          network_id: campaign.id.toString(),
          network_name: "boostiny",
          logo: campaign.advertiser.logo,
          campaign_type: campaign.campaign_type,
          campaign_manager: campaign.campaign_manager,
          title: campaign.name,
          title_c: campaign.name.toLowerCase(),
          category: campaign.category,
          category_c: campaign.category.toLowerCase(),
          desc_description: campaign.campaign_description.description,
          desc_creatives: campaign.campaign_description.creatives,
          desc_promotion: campaign.campaign_description.promotion,
          desc_dos_and_donts: campaign.campaign_description.dos_and_donts,
          desc_website_url: campaign.campaign_description.website_url,
          coupons: campaign.coupons,
        };
      }
    );

    const campaignsUpdate = await updateCampaignsDataMod(transformedCampaigns);

    res.status(200).json(campaignsUpdate);
  }
}
