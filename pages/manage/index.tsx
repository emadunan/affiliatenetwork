import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FC, useState } from "react";

const Manage: FC = () => {
  const [boostinyUpdateSpinner, setBoostinyUpdateSpinner] = useState(false);

  const onBoostinyCampaignUpdate = async () => {
    setBoostinyUpdateSpinner(true);
    const response = await fetch("/api/boostiny/campaigns", {
      method: "PATCH",
    });

    if (!response.ok) return console.log("Failed");
    const result = await response.json();

    setBoostinyUpdateSpinner(false);

    console.log(result);
  };

  return (
    <Box component="div" className="flex items-center justify-center">
      <Box component="div" className="flex">
        <Typography variant="h6" component="h6">
          Update Boostiny&apos;s Campaigns
        </Typography>
        <Button
          variant="outlined"
          onClick={onBoostinyCampaignUpdate}
          sx={{ mx: "1rem" }}
        >
          Update
        </Button>
        {boostinyUpdateSpinner && <CircularProgress color="primary" />}
      </Box>
    </Box>
  );
};

export default Manage;
