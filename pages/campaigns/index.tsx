import { Box, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import CampaignTable from "../../components/campaign/campaign-table";
import { useGetAllCampaignsQuery } from "../../services/camaign";

const Campaigns: FC = () => {
  const { data: campaigns, error, isLoading } = useGetAllCampaignsQuery();
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();
    const filteredResult = campaigns?.filter(item => item.title_c.includes(text) || item.category_c.includes(text));
    setFilteredCampaigns(filteredResult);
  }

  return (
    <Box component="div" className="flex flex-col items-center justify-center">
      <TextField id="outlined-basic" label="Name/Category" variant="outlined" onChange={handleFilterChange}/>
      <Box component="div">
        {filteredCampaigns?.length && <CampaignTable campaigns={filteredCampaigns} />}
      </Box>
    </Box>
  );
}

export default Campaigns;