import { UserMeta } from "@prisma/client";
import { UserWithMeta } from "@prisma/client/scalar";
import db from "../lib/prismadb";

export async function addUserMeta(userData: UserMeta) {
  return await db.userMeta.create({data: userData});
}

export async function getAllUsers() {
  return await db.user.findMany({
    include: {
      userMeta: true,
    },
    orderBy: {
      userMeta: {
        last_login: "desc"
      }
    }
  })
}

export async function getOneUser(id: string): Promise<UserWithMeta | null> {
  return await db.user.findFirst({
    where: {
      id
    },
    include: {
      userMeta: true,
    }
  });
}

