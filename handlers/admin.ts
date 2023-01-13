import db from "../lib/prismadb";

export async function getUsersWithPendingReqCount() {
  return await db.userCampaigns.count({
    where: {
      status: "pending",
    }
  })
}

export async function getAllUsersWithPendingReq() {
  return await db.user.findMany({
    include: {
      userCampaigns: {
        include: {
          campaign: true
        },
        where: {
          status: "pending"
        },
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

export async function declineUserCampaignReq(userId: string, campaignId: string) {
  return await db.userCampaigns.updateMany({
    where: {
      AND: [
        { userId },
        { campaignId }
      ],
    },
    data: {
      status: "declined",
    }
  })
}

export async function ApproveUserCampaignReq(userId: string, campaignId: string, coupons: any[]) {
  await db.userCampaigns.updateMany({
    where: {
      AND: [
        { userId },
        { campaignId }
      ],
    },
    data: {
      status: "approved",
    }
  });

  coupons.forEach(async(coupon: any) => {
    await db.userCoupons.create({
      data: {
        userId,
        couponId: coupon.id,
        percent: coupon.percent
      }
    })
  });
}