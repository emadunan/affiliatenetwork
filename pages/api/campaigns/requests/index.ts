import { NextApiRequest, NextApiResponse } from "next";
import { getUsersWithCampaigns } from "../../../../handlers/users";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const usersWithPendingReq = await getUsersWithCampaigns();
      res.status(200).json(usersWithPendingReq);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      res.status(400).json("Unexpected Error have happened ⚠️");
    }
  }
}

export default handler;
