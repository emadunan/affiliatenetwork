import type { NextApiRequest, NextApiResponse } from "next";
import { getOneUser, modOneUser } from "../../../handlers/users";
import { UserWithMeta } from "@prisma/client/scalar";
import { User } from "@prisma/client";

type Data = string | User |UserWithMeta;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
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
  } else if (req.method === "PUT") {
    try {

      const userId = req.query.id;
      const userData: Partial<UserWithMeta> = req.body;

      const user = await modOneUser(userData, userId as string);

      res.status(200).json(user);
      
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
}
