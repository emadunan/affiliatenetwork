import type { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../../constants";
import { getUsersWithPendingReqCount } from "../../../../handlers/admin";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("REQUESTED!");
      
      const reqsCount = await getUsersWithPendingReqCount();

      res.status(200).json(reqsCount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;
