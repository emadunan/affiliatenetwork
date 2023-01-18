import { Box, CircularProgress, TextField } from "@mui/material";
import { CampaignWithUser } from "@prisma/client/scalar";
import { useSession } from "next-auth/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import CampaignTable from "../../components/campaign/campaign-table";
import { useGetAllCampaignsQuery } from "../../services/camaign";

const Campaigns: FC = () => {
  const { data: session } = useSession();
  const { data: campaigns, isLoading } = useGetAllCampaignsQuery(
    session?.user.userId as string
  );

  console.log(session, campaigns);

  const [filteredCampaigns, setFilteredCampaigns] =
    useState<CampaignWithUser[]>();

  useEffect(() => {
    setFilteredCampaigns(campaigns);
  }, [campaigns]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();
    const filteredResult = campaigns?.filter(
      (item) => item.title_c.includes(text) || item.category_c?.includes(text)
    );
    setFilteredCampaigns(filteredResult);
  };

  // PUT http://localhost:3000/api/campaigns/all/cld1ymz4q00009d0dhw43frqh 400 (Bad Request)

  return (
    <Box component="div" className="flex flex-col items-center justify-center">
      <TextField
        id="outlined-basic"
        label="Name/Category"
        variant="outlined"
        autoComplete="off"
        onChange={handleFilterChange}
        className="my-4"
      />
      <Box component="div" className="my-4">
        {filteredCampaigns && <CampaignTable campaigns={filteredCampaigns} />}
        {isLoading && <CircularProgress color="primary" />}
      </Box>
    </Box>
  );
};

export default Campaigns;
