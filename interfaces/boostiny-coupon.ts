import { Campaign } from "@prisma/client";

export interface Coupon {
  coupon: string;
  countries: string[];
  start_date: string;
  account_manager: string;
  ad_set: string | null;
  campaign: Campaign;
}