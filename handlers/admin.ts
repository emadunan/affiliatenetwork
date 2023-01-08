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
          campaign: true,
        },
        where: {
          status: "pending"
        },
      }
    }
  });
}