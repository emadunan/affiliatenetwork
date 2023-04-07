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

      // const page = req.query.page;
      const fromDate = formatDate(new Date(req.query.fromDate as string));
      const untilDate = formatDate(new Date(req.query.untilDate as string));

      let campaign_name = req.query.campaign_name;

      if (campaign_name === "null") {
        campaign_name = "";
      }

      // &campaign_name=Raneen
      const getPerformanceReportPage = async (page = 1) => {
        console.log(
          `${boostinyApiUrl}/publisher/performance?page=${page}&campaign_name=${campaign_name}&from=${fromDate}&to=${untilDate}`
        );

        const response = await fetch(
          `${boostinyApiUrl}/publisher/performance?page=${page}&campaign_name=${campaign_name}&from=${fromDate}&to=${untilDate}`,
          {
            method: "GET",
            headers: {
              Authorization: boostinyApiKey,
            },
          }
        );

        return await response.json();
      };

      // Get performance report for the first page
      const result = (await getPerformanceReportPage()).payload;

      // Calculate the number of pages in the performance report
      const numberOfPages = Math.ceil(
        result.pagination.total / result.pagination.perPage
      );

      for (let i = 2; i < numberOfPages; i++) {
        const currPageResultData = (await getPerformanceReportPage(i)).payload
          .data;
        result.data = [...result.data, ...currPageResultData];
      }

      const transformedData = await Promise.all(
        result.data.map(async (el: any) => {
          // Get meta data from database
          const elMeta = await getCouponWithUsers(el.code, el.campaign_name);

          // Check if the record related to the current logged user
          const currUser = elMeta?.userCoupons.find((u) => u.userId === userId);

          if (privilege === "admin") {
            // Add publishers data and return result
            const transformedEl = { ...el, couponMeta: elMeta };
            return transformedEl;
          } else if (currUser) {
            //
            const transformedEl = {
              ...el,
              revenue: (+el.revenue * currUser.percent) / 100 + "",
              net_revenue: (+el.net_revenue * currUser.percent) / 100 + "",
            };
            return transformedEl;
          }
        })
      );

      let filteredData;

      if (transformedData) {
        filteredData = transformedData.filter((el: any) => !!el);
      } else {
        filteredData = [];
      }

      res.status(200).json(filteredData);
    } catch (error: unknown) {
      console.log("CATCH ERROR!!!");

      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}
