declare module "@prisma/client/scalar" {

  import { Prisma } from '@prisma/client';


  // A type that includes userMeta relation to `User`
  const userWithMeta = Prisma.validator<Prisma.UserArgs>()({
    include: {
      userMeta: true,
      userCampaigns: {
        include: {
          campaign: true,
        },
      },
      userCoupons: {
        include: {
          coupon: true,
        }
      }
    },
  });
  export type UserWithMeta = Prisma.UserGetPayload<typeof userWithMeta>;

  // A type that includes UserCampaigns relation to `Campaign`
  const campaignWithUser = Prisma.validator<Prisma.CampaignArgs>()({
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
  export type CampaignWithUser = Prisma.CampaignGetPayload<typeof campaignWithUser>;

  //
  const userCampaignWithCoupons = Prisma.validator<Prisma.UserCampaignsArgs>()({
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
  });
  export type UserCampaignWithCoupons = Prisma.UserCampaignsGetPayload<typeof userCampaignWithCoupons>;

  // A type that includes UserCampaigns relation to `User`
  const userWithCampaigns = Prisma.validator<Prisma.UserArgs>()({
    include: {
      userCampaigns: {
        include: {
          campaign: true,
        },
      },
      userMeta: {
        select: {
          reqNumber: true,
        }
      }
    }
  });
  export type UserWithCampaigns = Prisma.UserGetPayload<typeof userWithCampaigns>;

  const userCampaignWzCampaignWzCoupons = Prisma.validator<Prisma.UserCampaignsArgs>()({
    include: {
      campaign: {
        include: {
          coupons: true,
        }
      },
    },
  })
  export type UserCampaignWzCampaignWzCoupons = Prisma.UserCampaignsGetPayload<typeof userCampaignWzCampaignWzCoupons>;

  const userWzCampaignsWzCoupons = Prisma.validator<Prisma.UserArgs>()({
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
  });
  export type UserWzCampaignsWzCoupons = Prisma.UserGetPayload<typeof userWzCampaignsWzCoupons>

  // A type that include coupons related to `Campaign`
  const campaignWithCoupons = Prisma.validator<Prisma.CampaignArgs>()({
    include: {
      coupons: true,
    }
  });
  export type CampaignWithCoupons = Prisma.CampaignGetPayload<typeof campaignWithCoupons>

  // A type that include coupons related to `Campaign`
  const campaignWithBoostinyCoupons = Prisma.validator<Prisma.CampaignArgs>()({
    include: {
      coupons: {
        select: {
          coupon: true,
          countries: true,
          start_date: true,
          account_manager: true,
          ad_set: true
        }
      },
    }
  });
  export type CampaignWithBoostinyCoupons = Prisma.CampaignGetPayload<typeof campaignWithBoostinyCoupons>

  //
  const campaignWzCouponsWzUserId = Prisma.validator<Prisma.CampaignArgs>()({
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
  });

  export type CampaignWzCouponsWzUserId = Prisma.CampaignGetPayload<typeof campaignWzCouponsWzUserId>

  const campaignWzUserWzCoupons = Prisma.validator<Prisma.CampaignArgs>()({
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
  });

  export type CampaignWzUserWzCoupons = Prisma.CampaignGetPayload<typeof campaignWzUserWzCoupons>
}