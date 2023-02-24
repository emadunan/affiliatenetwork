import db from "../lib/prismadb";

export async function getCouponWithUsers(coupon: string, campaign_name: string) {
  const selectedCoupon = await db.coupon.findFirst({
    where: {
      coupon,
      campaign : {
        title_c: campaign_name.toLocaleLowerCase()
      }
    },
    include: {
      userCoupons: {
        include: {
          user: true,
        }
      }
    }
  });

  return selectedCoupon;
}