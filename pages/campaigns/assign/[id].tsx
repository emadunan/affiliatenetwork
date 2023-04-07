import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import UserSelect from "../../../components/user/user-select";
import CampaignAssignList from "../../../components/campaign/campaign-assign-list";
import useCampaignAssign from "../../../hooks/use-campaign-assign";
import React from "react";
import { useRouter } from "next/router";

interface CampaignAssignProps { }

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
      console.log(result);
      
      setSelectedCampaign(result);
    })()
  }, [campaignId]);

  const handleChangeUser = (userId: string) => {
    setUserId(userId);
  }

  return (
    <Box component="div">
      <UserSelect userId={userId} onChangeUser={handleChangeUser} />
      {userId && (
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
