import { UserMeta } from "@prisma/client";
import db from "../lib/prismadb";

export async function addUserMeta(userData: UserMeta) {
  return await db.userMeta.create({data: userData});
}

export async function getAllUsers() {
  return await db.user.findMany({
    include: {
      UserMeta: true,
    },
    orderBy: {
      UserMeta: {
        last_login: "desc"
      }
    }
  })
}

