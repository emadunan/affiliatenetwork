import db from "../lib/prismadb";
import { Performance } from "@prisma/client";

export async function getCouponWithUsers(coupon: string, campaign_name: string) {
  const selectedCoupon = await db.coupon.findFirst({
    where: {
      coupon,
      campaign: {
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

export async function deleteOrdersAfterDate(dateToDelete: Date) {
  return await db.performance.deleteMany({
    where: {
      date: {
        gte: dateToDelete
      }
    }
  })
}

export async function addPerformanceItem(item: Partial<Performance>) {
  const createdItem = await db.performance.create({
    data: {
      campaign_name: item.campaign_name as string,
      campaign_logo: item.campaign_logo as string,
      automation: item.automation as string,
      last_updated_at: new Date(item.last_updated_at as unknown as string),
      last_fetched_at: new Date(),
      code: item.code as string,
      date: new Date(item.date as unknown as string),
      original_currency: item.original_currency as string,
      country: item.country as string,
      customer_type: item.customer_type as string,
      ad_set: item.ad_set as string,
      month: item.month as string,
      month_number: item.month_number as string,
      order_id: item.order_id as string,
      aov: item.aov as string,
      orders: item.orders as string,
      net_orders: item.net_orders as string,
      orders_cancellation_rate: item.orders_cancellation_rate as string,
      revenue: item.revenue as string,
      net_revenue: item.net_revenue as string,
      revenue_cancellation_rate: item.revenue_cancellation_rate as string,
      sales_amount: item.sales_amount as string,
      net_sales_amount: item.net_sales_amount as string,
      sales_amount_cancellation_rate: item.sales_amount_cancellation_rate as string,
      sales_amount_usd: item.sales_amount_usd as string,
      net_sales_amount_usd: item.net_sales_amount_usd as string,
      sales_amount_usd_cancellation_rate: item.sales_amount_usd_cancellation_rate as string,
      aov_usd: item.aov_usd as string,
      net_aov_usd: item.net_aov_usd as string,
      aov_usd_cancellation_rate: item.aov_usd_cancellation_rate as string,
    }});

  
  return createdItem;
}