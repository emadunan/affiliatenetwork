declare module "@prisma/client/scalar" {

  import { Prisma } from '@prisma/client';


  // 1: Define a type that includes userMeta relation to `User`
  const userWithMeta = Prisma.validator<Prisma.UserArgs>()({
    include: {
      userMeta: true
    },
  });
  export type UserWithMeta = Prisma.UserGetPayload<typeof userWithMeta>;

  // 2: Define a type that includes UserCampaigns relation to `Campaign`
  const campaignWithUser = Prisma.validator<Prisma.CampaignArgs>()({
    include: {
      userCampaigns: true,
    }
  });
  export type CampaignWithUser = Prisma.CampaignGetPayload<typeof campaignWithUser>;

  // 3: Define a type that includes UserCampaigns relation to `User`
  const userWithCampaigns = Prisma.validator<Prisma.UserArgs>()({
    include: {
      userCampaigns: {
        include: {
          campaign: true
        }
      }
    }
  });
  export type UserWithCampaigns = Prisma.UserGetPayload<typeof userWithCampaigns>;

  // 4: Define a type that include coupons related to `Campaign`
  const campaignWithCoupons = Prisma.validator<Prisma.CampaignArgs>()({
    include: {
      coupons: true,
    }
  });
  export type CampaignWithCoupons = Prisma.CampaignGetPayload<typeof campaignWithCoupons>

}