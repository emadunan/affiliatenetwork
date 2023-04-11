import { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";
import { getUsersWithCampaigns } from "../../../../handlers/users";
import { UserWzCampaignsWzCoupons } from "@prisma/client/scalar";

type Data = UserWzCampaignsWzCoupons[] | string;

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    try {
      const usersWithPendingReq = await getUsersWithCampaigns();
      res.status(200).json(usersWithPendingReq);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;
