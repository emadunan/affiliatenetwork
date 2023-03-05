import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { getCouponWithUsers } from "../../../handlers/performance";
import { formatDate } from "../../../utils";

const boostinyApiKey = process.env.BOOSTINY_API_KEY as string;
const boostinyApiUrl = process.env.BOOSTINY_API_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
      }

      const {
        user: { privilege, userId },
      } = session;

      const page = req.query.page;
      const fromDate = formatDate(new Date(req.query.fromDate as string));
      const untilDate = formatDate(new Date(req.query.untilDate as string));

      // &campaign_name=Raneen
      const response = await fetch(
        `${boostinyApiUrl}/publisher/performance?page=${page}&from=${fromDate}&to=${untilDate}`,
        {
          method: "GET",
          headers: {
            Authorization: boostinyApiKey,
          },
        }
      );

      const result = await response.json();

      const transformedData = await Promise.all(
        result.payload.data.map(async (el: any) => {
          const elMeta = await getCouponWithUsers(el.code, el.campaign_name);
          const currUser = elMeta?.userCoupons.find((u) => u.userId === userId);
          if (privilege === "admin") {
            // Add publishers data and return result
            const transformedEl = { ...el, couponMeta: elMeta };
            return transformedEl;
          } else if (currUser) {
            //
            const transformedEl = {
              ...el,
              revenue: Math.floor((+el.revenue * currUser.percent) / 100) + "",
              net_revenue:
                Math.floor((+el.net_revenue * currUser.percent) / 100) + "",
            };
            return transformedEl;
          } else {
            for (const key in el) {
              if (
                Object.prototype.hasOwnProperty.call(el, key) &&
                key !== "campaign_name" &&
                key !== "code"
              ) {
                el[key] = "###";
              }
            }

            return el;
          }
        })
      );

      result.payload.data = transformedData;
      console.log(transformedData);

      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}
