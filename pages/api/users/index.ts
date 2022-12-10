import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from "../../../handlers/users";

type Data = string | User[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }

    res
      .status(400)
      .json(
        "Unexpected Error have occured, please contact the system administrator on +201551562910."
      );
  }
}
