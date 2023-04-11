import { Coupon, User, UserCoupons } from "@prisma/client";

export type BoostinyPerformanceSummary = {
  full_count: string;
  orders: string;
  net_orders: string;
  orders_cancellation_rate: string;
  revenue: string;
  net_revenue: string;
  revenue_cancellation_rate: string;
  sales_amount: string;
  net_sales_amount: string;
  sales_amount_cancellation_rate: string;
  sales_amount_usd: string;
  net_sales_amount_usd: string;
  sales_amount_usd_cancellation_rate: string;
  aov_usd: string;
  net_aov_usd: string;
  aov_usd_cancellation_rate: string;
}

export type BoostinyPerformancePagination = {
  total: number;
  perPage: number;
  currentPage: number;
}

export type BoostinyPerformanceRecord = {
  full_count: string;
  campaign_name: string;
  campaign_id: string;
  campaign_logo: string;
  automation: string;
  last_updated_at: string;
  code: string;
  code_id: string;
  orders: string;
  net_orders: string;
  orders_cancellation_rate: string;
  revenue: string;
  net_revenue: string;
  revenue_cancellation_rate: string;
  sales_amount: string;
  net_sales_amount: string;
  sales_amount_cancellation_rate: string;
  sales_amount_usd: string;
  net_sales_amount_usd: string;
  sales_amount_usd_cancellation_rate: string;
  aov_usd: string;
  net_aov_usd: string;
  aov_usd_cancellation_rate: string;
  couponMeta?: CouponMeta;
}

export type CouponMeta = (Coupon & { userCoupons: (UserCoupons & { user: User; })[] }) | null;

export interface BoostinyPerformanceReport {
  summary: BoostinyPerformanceSummary;
  data: (BoostinyPerformanceRecord | undefined)[];
  pagination: BoostinyPerformancePagination;
}