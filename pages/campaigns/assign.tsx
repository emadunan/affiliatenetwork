import { Box } from "@mui/material";
import { FC } from "react";
import UserSelect from "../../components/user/user-select";
import CampaignAssignList from "../../components/campaign/campaign-assign-list";
import useCampaignAssign from "../../hooks/use-campaign-assign";
import React from "react";

interface CampaignAssignProps { }

const CampaignAssign: FC<CampaignAssignProps> = () => {
  const { selectedCampaign, setSelectedCampaign } = useCampaignAssign();

  const [userId, setUserId] = React.useState("");

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
