import { NextApiRequest, NextApiResponse } from "next";
import { getOneUserWithCampaigns } from "../../../handlers/users";

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
      res.status(400).json("Unexpected Error have happened ⚠️");
    }
  }
}

export default handler;