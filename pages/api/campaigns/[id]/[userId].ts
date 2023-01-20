import { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";
import { getCampaignCouponIdsForUser } from "../../../../handlers/campaigns";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { id, userId } = req.query;
      
      const couponIds = await getCampaignCouponIdsForUser(userId as string, id as string);      
      res.status(200).json(couponIds);

    } catch (error: unknown) {
      // Handle most error cases
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      // Fallback for rare types of errors
      res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;