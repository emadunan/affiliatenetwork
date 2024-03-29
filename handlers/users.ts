import { User, UserMeta } from "@prisma/client";
import { UserWithCampaigns, UserWithMeta } from "@prisma/client/scalar";
import db from "../lib/prismadb";

export async function addUserMeta(userData: UserMeta): Promise<UserMeta> { 
  return await db.userMeta.create({ data: userData });
}

db.user.findFirst({
  include: {
    userCampaigns: {
      include: {
        campaign: {
          include: {
            coupons: true
          }
        }
      }
    }
  }
})

export async function getAllUsers(): Promise<UserWithMeta[] | null> {
  return await db.user.findMany({
    include: {
      userMeta: true,
      userCampaigns: {
        where: {
          status: "approved"
        },
        include: {
          campaign: true,
        }
      },
      userCoupons: {
        include: {
          coupon: true,
        }
      }
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
      userCampaigns: {
        where: {
          status: "approved"
        },
        include: {
          campaign: true,
        }
      },
      userCoupons: {
        include: {
          coupon: true,
        }
      }
    }
  });
}

export async function getOneUserWithCampaigns(id: string): Promise<UserWithCampaigns | null> {
  return await db.user.findFirst({
    where: {
      id
    },
    include: {
      userCampaigns: {
        include: {
          campaign: true,
        },
        where: {
          status: "pending",
        }
      },
      userMeta: {
        select: {
          reqNumber: true,
        }
      }
    }
  });
}

export async function getUsersWithCampaigns() {
  return await db.user.findMany({
    include: {
      userCampaigns: {
        include: {
          campaign: {
            include: {
              coupons: true,
            }
          }
        },
        where: {
          status: "pending"
        }
      }
    },
    where: {
      userCampaigns: {
        some: {
          status: "pending"
        }
      }
    }
  });
}

export async function delOneUser(id: string): Promise<User> {
  await db.userMeta.delete({
    where: {
      userId: id,
    }
  });

  await db.account.deleteMany({
    where: {
      userId: id,
    }
  });

  return await db.user.delete({
    where: {
      id,
    }
  });
}

export async function modOneUser(user: Partial<UserWithMeta>, id: string) {
  const { userMeta } = user;

  if (!userMeta) throw new Error("Profile can't be modified without data");

  return await db.user.update({
    where: {
      id,
    },
    data: {
      userMeta: {
        update: userMeta
      }
    }
  })
}

