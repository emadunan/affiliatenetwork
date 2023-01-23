import db from "../lib/prismadb";
import { cloneDeep } from "lodash";
import { isTupleInArr } from "../utils";
import { Campaign } from "@prisma/client";

export const updateCampaignsDataMod = async (campaignsArr: any[]) => {
  // Store for all new and expired campaigns
  const newCampaigns = [];
  const expiredCampaigns = [];

  // Get all campaigns from database
  const allDbCampaigns = await db.campaign.findMany({
    where: {
      expired: false,
    }
  });

  // Map returned campaigns into typles of id & network
  const allDbCampaignsT = allDbCampaigns.map((campaign): [string, string] => {
    return [campaign.network_id, campaign.network_name];
  });

  const allFetchedCampaignsT = campaignsArr.map((campaign): [string, string] => [campaign.network_id, campaign.network_name]);

  // Flag any unfound campaign as an expired
  for (const campaign of allDbCampaigns) {
    if (!isTupleInArr(allFetchedCampaignsT, [campaign.network_id!, campaign.network_name!])) {
      await db.campaign.updateMany({
        where: {
          network_id: campaign.network_id,
          network_name: campaign.network_name,
        },
        data: {
          expired: true
        }
      });

      console.log("EXPIRED", campaign);
      expiredCampaigns.push(campaign);
    }
  }


  // Create new campaign if it was not found in the database
  for (const campaign of campaignsArr) {
    if (!isTupleInArr(allDbCampaignsT, [campaign.network_id!, campaign.network_name!])) {

      for (const coupon of campaign.coupons) {
        if (!coupon.countries) {
          coupon.countries = [];
        }
      }

      // https://cdn.arabyads.com/images/arabyads-logo.png
      // Change arabyads-logo with fallback image
      if (campaign.logo === "https://cdn.arabyads.com/images/arabyads-logo.png") campaign.logo = "/fallback-image.png";

      const newCampaign = await db.campaign.create({
        data: {
          network_id: campaign.network_id!,
          network_name: campaign.network_name!,
          logo: campaign.logo,
          campaign_type: campaign.campaign_type!,
          title: campaign.title!,
          title_c: campaign.title_c!,
          category: campaign.category,
          category_c: campaign.category_c,
          campaign_manager: campaign.campaign_manager,
          desc_description: campaign.desc_description,
          desc_promotion: campaign.desc_promotion,
          desc_dos_and_donts: campaign.desc_dos_and_donts,
          desc_creatives: campaign.desc_creatives,
          desc_website_url: campaign.desc_website_url,
          expired: false,
          coupons: {
            create: campaign.coupons
          },
        }
      });

      console.log("CREATED", newCampaign);
      newCampaigns.push(newCampaign);
    }
  }

  return {
    newCampaigns,
    expiredCampaigns,
  }
}

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