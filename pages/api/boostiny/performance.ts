import type { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { formatDate } from "../../../utils";

const boostinyApiKey = process.env.BOOSTINY_API_KEY as string;
const boostinyApiUrl = process.env.BOOSTINY_API_URL as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const fromDate = formatDate(new Date(req.query.fromDate as string));
      const untilDate = formatDate(new Date(req.query.untilDate as string));

      // &campaign_name=Raneen
      const response = await fetch(`${boostinyApiUrl}/publisher/performance?from=${fromDate}&to=${untilDate}`, {
        method: "GET",
        headers: {
          "Authorization": boostinyApiKey
        }
      });

      const result = await response.json();

      console.log(result);

      res.status(200).json(result);
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}