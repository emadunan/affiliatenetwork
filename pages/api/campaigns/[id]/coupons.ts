import { NextApiRequest, NextApiResponse } from "next";
import { getCampaignWithCoupons } from "../../../../handlers/campaigns";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const campaign = await getCampaignWithCoupons(id as string);
      res.status(200).json(campaign);
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
