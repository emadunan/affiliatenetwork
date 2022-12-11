import type { NextApiRequest, NextApiResponse } from "next";
import { getOneUser } from "../../../handlers/users";
import { UserWithMeta } from "@prisma/client/scalar";

type Data = string | UserWithMeta;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id: userId } = req.query;

    const user = await getOneUser(userId as string);

    if (user) {
      return res.status(200).json(user);
    }

    res.status(404).json("User not found");
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
