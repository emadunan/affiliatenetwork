import { Coupon } from "./boostiny-coupon";

type CampaignDescription = {
  description: string | null;
  promotion: string | null;
  dos_and_donts: string | null;
  creatives: string | null;
  website_url: string | null;
}

type Advertiser = {
  name: string;
  logo: string;
}

export interface BoostinyCampaign {
  id: number;
  name: string;
  campaign_type: string;
  // tracking_link_details: object or null
  campaign_description: CampaignDescription;
  logo: string | null;
  advertiser: Advertiser;
  category: string | null;
  campaign_manager: string | null;
  // payouts: array[array];
  coupons: Coupon[];
}