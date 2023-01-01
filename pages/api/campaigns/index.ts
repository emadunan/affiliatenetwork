import { NextApiRequest, NextApiResponse } from "next";
import {
  assignCampaignToUser,
  getAllCampaignWithStatus,
} from "../../../handlers/campaigns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const campaigns = await getAllCampaignWithStatus();
    res.status(200).json(campaigns);
  } else if (req.method === "PUT") {
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
  }
}
