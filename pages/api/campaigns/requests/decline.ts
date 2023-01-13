import type { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";
import { declineUserCampaignReq } from "../../../../handlers/admin";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const { userId, campaignId } = req.body;
      const approvedReq = await declineUserCampaignReq(userId, campaignId);
      res.status(200).json("decline");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;
