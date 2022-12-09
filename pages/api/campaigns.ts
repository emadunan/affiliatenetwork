import type { NextApiRequest, NextApiResponse } from 'next'

const boostinyApiKey = process.env.BOOSTINY_API_KEY as string;

// Boostiny API Endpoints
// https://api.boostiny.com/publisher/campaigns	
// https://api.boostiny.com/publisher/performance
// https://api.boostiny.com/publisher/link-performance

type Data = 
  | string
  | { name: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const response = await fetch("https://api.boostiny.com/publisher/campaigns", {
    headers: {
      "Authorization": boostinyApiKey
    }
  });

  if (!response.ok) return res.status(400).json("Couldn't fetch campaigns data!");

  const campaigns = await response.json();

  res.status(200).json(campaigns);
}