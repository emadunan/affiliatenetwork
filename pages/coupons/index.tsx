import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import CouponCard from "../../components/coupon/coupon-card";
import { Box } from "@mui/material";

const Coupons: FC = () => {
  const router = useRouter();

  const [coupons, setCoupons] = useState<any[]>();

  useEffect(() => {
    (async () => {
      const session = await getSession();

      const {
        user: { privilege },
      } = session || { user: { privilege: undefined } };

      if (session) {
        if (["admin", "publisher"].includes(privilege as string)) {
          fetch("/api/boostiny/campaigns")
            .then((response) => {
              if (!response.ok) return console.log(response);
              return response.json();
            })
            .then((data) => {
              console.log(data);

              const items = data.payload.data;
              console.log(items);
              const transformedItems = items.flatMap((item: any) =>
                item.coupons.map((coupon: any) => ({
                  couponId: `${item.id}-${coupon.coupon}`,
                  coupon_code: coupon.coupon,
                  coupon_ad_set: coupon.ad_set,
                  coupon_countries: coupon.countries,
                  campaignName: item.name,
                  campaignCategory: item.category,
                  coupon_network: "boostiny",
                  coupon_source: "api",
                }))
              );

              setCoupons(transformedItems);
              //const coupons = data.map((item: any) => )
            });
        } else {
          router.replace("/users/register");
        }
      }
    })();
  }, [router]);

  return (
    <Box component="div" className="flex flex-wrap items-center justify-center">
      {coupons?.map((coupon: any) => (
        <CouponCard key={coupon.couponId} coupon={coupon} />
      ))}
    </Box>
  );
};

export default Coupons;
