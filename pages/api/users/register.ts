import type { NextApiRequest, NextApiResponse } from "next";
import { addUserMeta } from "../../../handlers/users";

type Data = string | any;

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
      res.status(400).json(error.message);
    }

    res
      .status(400)
      .json(
        "Unexpected Error have occured, please contact the system administrator on +201551562910."
      );
  }
}
