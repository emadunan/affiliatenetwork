import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { getAllUsers } from "../../../handlers/users";

type Data = string | User[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const users = await getAllUsers();

    if (!users) return res.json([]);

    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }

    return res.status(400).json(ERROR_FALLBACK_MESSAGE);
  }
}
