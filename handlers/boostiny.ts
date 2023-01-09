import db from "../lib/prismadb";

export const updateCampaignsData = async (campaignsArr: any[]) => {
  // console.log(campaignsArr[0].coupons);
  
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
  const campaignsArrCopy = [...campaignsArr]
  
  campaignsArr.forEach(campaign => {
    delete campaign.coupons;
    return campaign;
  })

  await db.campaign.createMany({
    data: campaignsArr,
  });

  // Create coupons returned from API and assign them to their appropraite campaigns
  return campaignsArr.forEach(campaign => {
    console.log(campaign);
    
    db.campaign.update({
      where: {
        id: campaign.id as string
      },
      data: {
        coupons: {
          createMany: {
            data: campaign.coupons,
          }
        }
      },
      include: {
        coupons: true,
      }
    })
  });
};