import { Dayjs } from "dayjs";

export interface SelectedCoupon {
  id: string;
  coupon: string;
  countries: string[];
  start_date: string;
  account_manager: string;
  ad_set?: string;
  campaignId: string;
  assignedAt: Dayjs | null;
  assignEndAt: Dayjs | null;

  alreadyAssigned: boolean;
  checked: boolean;
  percent: number;
}

export interface SelectedCampaign {
  id: string;
  network_id: string;
  network_name: string;
  logo?: string;
  campaign_type: string;
  title: string;
  title_c: string;
  category?: string;
  category_c?: string;
  campaign_manager?: string;
  desc_description?: string;
  desc_promotion?: string;
  desc_dos_and_donts?: string;
  desc_creatives?: string;
  desc_website_url?: string;
  expired?: boolean;
  coupons: SelectedCoupon[]

  // userCampaigns UserCampaigns[]
}