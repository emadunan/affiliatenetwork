import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import UserSelect from "../../../components/user/user-select";
import CampaignAssignList from "../../../components/campaign/campaign-assign-list";
import useCampaignAssign from "../../../hooks/use-campaign-assign";
import React from "react";
import { useRouter } from "next/router";
import { cloneDeep } from "lodash";
import { SelectedCampaign } from "../../../interfaces/selected-campaign";

interface CampaignAssignProps {}

const CampaignAssign: FC<CampaignAssignProps> = () => {
  const { selectedCampaign, setSelectedCampaign } = useCampaignAssign();

  const [userId, setUserId] = React.useState("");

  const router = useRouter();
  const { id: campaignId } = router.query;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/campaigns/${campaignId}/coupons`);
      if (!response.ok) throw new Error("Failed to fetch campaign!!");

      const result = await response.json();

      setSelectedCampaign(result);
    })();
  }, [campaignId, setSelectedCampaign]);

  const handleUserChange = async (
    selectedCampaign: SelectedCampaign | undefined,
    userId: string
  ) => {
    // Check selected campaign is defined!
    if (selectedCampaign) {
      // fetch coupons assigned to that specific user in this campaign
      console.log(userId, selectedCampaign.id);

      const response = await fetch(
        `/api/campaigns/${selectedCampaign.id}/${userId}`
      );

      const ids = await response.json();
      console.log(ids);

      const liveCampaign = cloneDeep(selectedCampaign);

      liveCampaign.coupons.forEach((coupon) => {
        coupon.alreadyAssigned = ids.includes(coupon.id);
      });

      console.log(liveCampaign);

      // set state for the selected campaign
      setUserId(userId);
      setSelectedCampaign(liveCampaign);
    }
  };

  return (
    <Box component="div">
      {selectedCampaign && (
        <h1 className="text-center">{selectedCampaign.title}</h1>
      )}
      <UserSelect
        userId={userId}
        onChangeUser={handleUserChange.bind(null, selectedCampaign)}
      />
      {userId && selectedCampaign && (
        <CampaignAssignList
          direct={true}
          userId={userId}
          selectedCampaign={selectedCampaign}
          setSelectedCampaign={setSelectedCampaign}
        />
      )}
    </Box>
  );
};

export default CampaignAssign;
