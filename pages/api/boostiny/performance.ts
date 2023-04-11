import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { getCouponWithUsers } from "../../../handlers/performance";
import { formatDate } from "../../../utils";
import {
  BoostinyPerformanceReport,
  BoostinyPerformanceRecord,
} from "../../../interfaces/boostiny-performance-report";

const boostinyApiKey = process.env.BOOSTINY_API_KEY as string;
const boostinyApiUrl = process.env.BOOSTINY_API_URL as string;

type Data = BoostinyPerformanceReport | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json("You must be logged in.");
        return;
      }

      const {
        user: { privilege, userId },
      } = session;

      // Extract filtering criteria from query params;
      const fromDate = formatDate(new Date(req.query.fromDate as string));
      const untilDate = formatDate(new Date(req.query.untilDate as string));

      let campaign_name = req.query.campaign_name;

      if (campaign_name === "null") {
        campaign_name = "";
      }

      // AJAX Call for Boostiny Performance report
      const getPerformanceReportPage = async (
        page = 1
      ): Promise<BoostinyPerformanceReport> => {
        const response = await fetch(
          `${boostinyApiUrl}/publisher/performance?page=${page}&campaign_name=${campaign_name}&from=${fromDate}&to=${untilDate}`,
          {
            method: "GET",
            headers: {
              Authorization: boostinyApiKey,
            },
          }
        );

        const result = await response.json();

        // Extract data from payload and return them
        // Look at Boostiny API documentation 👇
        //https://developers.boostiny.com/#/operations/get-publisher-performance
        return result.payload;
      };

      // Get performance report for the first page
      const result = await getPerformanceReportPage();

      // Calculate the number of pages in the performance report
      const numberOfPages = Math.ceil(
        result.pagination.total / result.pagination.perPage
      );

      // Make an AJAX Call for every page returned in the pagination of the first page
      for (let i = 2; i < numberOfPages; i++) {
        const currPageResult = await getPerformanceReportPage(i);
        const currPageResultData = currPageResult.data;
        result.data = [...result.data, ...currPageResultData];
      }

      // Compine performance report records with the internal database to form unified report
      const transformedData = await Promise.all(
        result.data.map(async (el: BoostinyPerformanceRecord | undefined) => {
          // Check if the performance record is undefined
          if (!el) return;

          // Get meta data from database
          const elMeta = await getCouponWithUsers(el.code, el.campaign_name);

          // Check if the record related to the current logged user
          const currUser = elMeta?.userCoupons.find((u) => u.userId === userId);

          if (privilege === "admin") {
            // Add publishers data and return result
            const transformedEl = { ...el, couponMeta: elMeta };

            return transformedEl;
          } else if (currUser) {
            // Recalculate the user revenue and net-revenue according to the percent assigned to him
            const transformedEl = {
              ...el,
              revenue: (+el.revenue * currUser.percent) / 100 + "",
              net_revenue: (+el.net_revenue * currUser.percent) / 100 + "",
            };
            return transformedEl;
          }
        })
      );

      // Remove any null or undefined values
      let filteredData: (BoostinyPerformanceRecord | undefined)[];

      if (transformedData) {
        filteredData = transformedData.filter((el) => !!el);
      } else {
        filteredData = [];
      }

      const transformedResult = { ...result, data: filteredData };

      res.status(200).json(transformedResult);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      return res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}
