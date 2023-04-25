import * as React from "react";
import {
  useGetOneCampaignQuery,
  useMakeCampaignRequestMutation,
} from "../../services/campaign";
import { useRouter } from "next/router";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const CampaignDetail: React.FC = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { id: campaignId } = router.query;

  const { data: campaign } = useGetOneCampaignQuery(campaignId as string);

  const [setCampaignRequest, response] = useMakeCampaignRequestMutation();

  const handleMakeRequest = () => {
    const userId = session?.user.userId;

    if (typeof campaignId === "string") {
      setCampaignRequest({ userId, campaignId });
    }
  };

  const currUserCoupons = campaign?.userCampaigns
    .find((user) => user.userId === session?.user.userId)
    ?.user.userCoupons.filter((uc) => uc.coupon.campaignId === campaignId);

  return (
    <div>
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar alt={campaign?.title} src={campaign?.logo as string} />
        <Typography variant="h4" sx={{ m: 1 }}>
          {campaign?.title}
        </Typography>
        <Typography variant="subtitle2">
          ({!!campaign?.expired ? "Not-Active" : "Active"})
        </Typography>
      </Box>
      <Box
        component="div"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography>{campaign?.category}</Typography>
        {campaign?.userCampaigns.find(
          (uc) => uc.userId === session?.user.userId
        )?.status !== "pending" ? (
          <Button variant="outlined" onClick={handleMakeRequest} sx={{ mb: 1 }}>
            Make a Request
          </Button>
        ) : (
          "Pending ..."
        )}

        <Box component="div">
          <Typography>{campaign?.campaign_type}</Typography>
          <Typography>{campaign?.campaign_manager}</Typography>
        </Box>
      </Box>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <Typography variant="h5" textAlign="center">
        Your coupons
      </Typography>
      <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
        {currUserCoupons && currUserCoupons.length > 0 ? (
          currUserCoupons.map((uc) => (
            <Typography variant="h5" sx={{ m: 2 }} key={uc.couponId}>
              {uc.coupon.coupon}
            </Typography>
          ))
        ) : (
          <Typography>
            You don not have any assigned coupons in this campaign yet!
          </Typography>
        )}
      </Box>

      <Typography variant="h5" sx={{ textDecoration: "underline" }}>
        Description
      </Typography>
      <Box
        component="div"
        dangerouslySetInnerHTML={{
          __html: campaign?.desc_description as string,
        }}
      />

      <Typography variant="h5" sx={{ textDecoration: "underline" }}>
        Promotions
      </Typography>
      <Box
        component="div"
        dangerouslySetInnerHTML={{
          __html: !!campaign?.desc_promotion
            ? campaign?.desc_promotion
            : ("Not available" as string),
        }}
      />

      <Typography variant="h5" sx={{ textDecoration: "underline" }}>
        Dos and Donts
      </Typography>
      <Box
        component="div"
        dangerouslySetInnerHTML={{
          __html: !!campaign?.desc_dos_and_donts
            ? campaign?.desc_dos_and_donts
            : ("Not available" as string),
        }}
      />

      <Typography variant="h5" sx={{ textDecoration: "underline" }}>
        Creatives
      </Typography>
      <Box
        component="div"
        dangerouslySetInnerHTML={{
          __html: !!campaign?.desc_creatives
            ? campaign?.desc_creatives
            : ("Not available" as string),
        }}
      />
    </div>
  );
};

export default CampaignDetail;
