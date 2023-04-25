import { NextApiRequest, NextApiResponse } from "next";
import { ERROR_FALLBACK_MESSAGE } from "../../../constants";
import { boostinyCSVTextToJSON } from "../../../utils";
import { addPerformanceItem, deleteOrdersAfterDate } from "../../../handlers/performance";

type Data = any;

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    try {
      // Get form data from request
      const data = req.body as string;

      const orders = boostinyCSVTextToJSON(data);

      const dateToUpdate = orders[0].date;

      await deleteOrdersAfterDate(dateToUpdate)

      orders.forEach((order) => {
        if (order) {
          const orderToCreate = {
            ...order,
            date: new Date(order.date as unknown as string),
            last_updated_at: new Date(
              order.last_updated_at as unknown as string
            ),
          };
          addPerformanceItem(orderToCreate);
        }
      });

      res.status(200).json(orders);
    } catch (error: unknown) {
      // Handle most error cases
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }

      // Fallback for rare types of errors
      res.status(400).json(ERROR_FALLBACK_MESSAGE);
    }
  }
}

export default handler;
