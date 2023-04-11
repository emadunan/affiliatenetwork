import { Dayjs } from "dayjs";

export interface SelectedCoupon {
  id: string;
  coupon: string;
  countries: string[];
  start_date: string;
  account_manager: string;
  ad_set?: string | null;
  campaignId: string;
  assignedAt?: Dayjs | null;
  assignEndAt?: Dayjs | null;

  alreadyAssigned?: boolean;
  checked?: boolean;
  percent?: number;
}

export interface SelectedCampaign {
  id: string;
  network_id: string;
  network_name: string;
  logo?: string | null;
  campaign_type: string;
  title: string;
  title_c: string;
  category?: string | null;
  category_c?: string | null;
  campaign_manager?: string | null;
  desc_description?: string | null;
  desc_promotion?: string | null;
  desc_dos_and_donts?: string | null;
  desc_creatives?: string | null;
  desc_website_url?: string | null;
  expired?: boolean | null;
  coupons: SelectedCoupon[]

  // userCampaigns UserCampaigns[]
}