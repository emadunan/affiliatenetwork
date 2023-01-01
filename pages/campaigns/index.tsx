import { Box } from "@mui/material";
import { FC } from "react";
import CampaignTable from "../../components/campaign/campaign-table";
import { useGetAllCampaignsQuery } from "../../services/camaign";

const Campaigns: FC = () => {
  const { data: campaigns, error, isLoading } = useGetAllCampaignsQuery();

  return (
    <Box component="div" className="flex items-center justify-center">
      <Box component="div">
        {campaigns?.length && <CampaignTable campaigns={campaigns} />}
      </Box>
    </Box>
  );
}

export default Campaigns;