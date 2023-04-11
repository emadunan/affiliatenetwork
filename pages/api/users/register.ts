import type { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { addUserMeta } from "../../../handlers/users";
import { UserMeta } from "@prisma/client";

type Data = string | UserMeta;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const userData = req.body;

    const userMeta = await addUserMeta(userData);

    res.status(200).json(userMeta);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }

    return res.status(400).json(ERROR_FALLBACK_MESSAGE);
  }
}
