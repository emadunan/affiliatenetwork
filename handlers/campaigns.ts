import { CampaignWithUser, CampaignWzUserWzCoupons } from "@prisma/client/scalar";
import db from "../lib/prismadb";


export async function getAllCampaigns() {
  return await db.campaign.findMany();
}


export async function getCampaignWithCoupons(id: string) {
  return await db.campaign.findFirst({
    where: {
      id,
    },
    include: {
      coupons: {
        include: {
          userCoupons: {
            select: {
              userId: true,
            }
          }
        }
      }
    }
  })
}


export async function getCampaignWzUsersWzCoupons(campaignId: string): Promise<CampaignWzUserWzCoupons | null> {
  return await db.campaign.findFirst({
    where: {
      id: campaignId,
    },
    include: {
      userCampaigns: {
        include: {
          user: {
            include: {
              userCoupons: {
                include: {
                  coupon: true,
                }
              }
            }
          }
        }
      }
    }
  })
}


export async function getAllCampaignWithStatus(): Promise<CampaignWithUser[]> {
  return await db.campaign.findMany({
    include: {
      userCampaigns: {
        include: {
          user: {
            include: {
              userCoupons: {
                include: {
                  coupon: true,
                }
              }
            }
          }
        }
      },
    }
  });
}


export async function getUserCampaignsWithStatus(userId: string | undefined): Promise<CampaignWithUser[]> {
  return await db.campaign.findMany({
    include: {
      userCampaigns: {
        include: {
          user: {
            include: {
              userCoupons: {
                include: {
                  coupon: true,
                }
              }
            }
          }
        }
      },
    },
    where: {
      userCampaigns: {
        some: {
          userId,
        }
      }
    }
  });
}


export async function assignCampaignToUser(userId: string, campaignId: string) {
  return await db.userCampaigns.upsert({
    create: {
      userId,
      campaignId,
      status: "pending",
    },
    update: {
      status: "pending",
    },
    where: {
      userId_campaignId: {
        userId, campaignId
      }
    },
  })
}


export async function getCampaignCouponIdsForUser(userId: string, campaignId: string) {
  const couponIds = await db.coupon.findMany({
    where: {
      campaignId,
      userCoupons: {
        some: {
          userId,
        }
      }
    },
    select: {
      id: true,
    }
  });

  return couponIds.map(couponId => couponId.id);

}