import db from "../lib/prismadb";
import { cloneDeep } from "lodash";

export const updateCampaignsData = async (campaignsArr: any[]) => {
  
  // Get all boostiny's capaigns
  const campaignsToDel = await db.campaign.findMany({
    where: {
      network_name: "boostiny",
    }
  });

  // Delete all coupons related to boostiny's campaigns
  campaignsToDel.forEach(async (campaign) => {
    await db.coupon.deleteMany({
      where: {
        campaignId: campaign.id,
      }
    });
  });

  // Delete all campaigns related to boostiny
  await db.campaign.deleteMany({
    where: {
      network_name: "boostiny"
    },
  });

  // Create new boostiny campaigns based on the results returned from API
  const campaignsArrCopy = cloneDeep(campaignsArr);
  
  campaignsArr.forEach(campaign => {
    delete campaign.coupons;
    return campaign;
  })

  await db.campaign.createMany({
    data: campaignsArr,
  });

  // Create coupons returned from API and assign them to their appropraite campaigns
  campaignsArrCopy.forEach(async (campaign) => {
    
    for (const coupon of campaign.coupons) {
      if (!coupon.countries) {
        coupon.countries = [];
      }
    }
    
    const camp = await db.campaign.findFirst({
      where: {
        network_id: campaign.network_id,
        network_name: "boostiny",
      }
    })
    
    await db.campaign.update({
      where: {
        id: camp?.id,
      },
      data: {
        coupons: {
          createMany: {
            data: campaign.coupons,
          }
        }
      }
    });
  });
};