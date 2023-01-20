import { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";
import {
  assignCampaignToUser,
  getAllCampaignWithStatus,
  getUserCampaignsWithStatus,
} from "../../../../handlers/campaigns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = req.query.id;
    const campaigns = await getAllCampaignWithStatus();
    const userCampaigns = await getUserCampaignsWithStatus(userId as string);
    const userCampaignIds = userCampaigns.map((campaign) => campaign.id);

    // Replace raw campaigns with user campaigns if the user have already requested
    for (const campaign of campaigns) {
      if (userCampaignIds.includes(campaign.id)) {
        const campaignIdx = campaigns.findIndex(
          (camp) => camp.id === campaign.id
        );

        const userCampaign = userCampaigns.find(
          (ucamp) => ucamp.id === campaign.id
        );

        if (userCampaign) campaigns.splice(campaignIdx, 1, userCampaign);
      }
    }

    res.status(200).json(campaigns);
  } else if (req.method === "PUT") {
    try {
      const { userId, campaignId } = req.body;

      const result = await assignCampaignToUser(userId, campaignId);

      if (!result)
        return res
          .status(400)
          .json(
            "Unfortunatly, Your request can't be resolved, please try again later!"
          );

      res
        .status(200)
        .json(
          "Your request have been transmited, it takes between 1 and 30 minutes until it replied!"
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}
