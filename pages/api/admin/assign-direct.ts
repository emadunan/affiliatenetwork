import type { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { assignCampaignToUserDirect } from "../../../handlers/admin";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const { userId, campaignId, coupons } = req.body;
      await assignCampaignToUserDirect(userId, campaignId, coupons);
      res.status(200).json("approve");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;
