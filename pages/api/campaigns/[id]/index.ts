import { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";
import { getOneUserWithCampaigns } from "../../../../handlers/users";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const userWithCampaigns = await getOneUserWithCampaigns(id as string);
      res.status(200).json(userWithCampaigns);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;
