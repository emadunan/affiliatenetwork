import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { cloneDeep } from "lodash";

import { FC } from "react";
import useCampaignAssign from "../../hooks/use-campaign-assign";
import CampaignAssignList from "../campaign/campaign-assign-list";

// import { CampaignWithCoupons } from "@prisma/client/scalar";
// type CampaignWithCouponsPlus = CampaignWithCoupons & { checked: true | false, percent: number };

interface UserRequestProps {
  userId: string;
  username?: string;
  userImage?: string;
  userCampaigns?: any;
}

const UserRequest: FC<UserRequestProps> = (props) => {
  // Use Hook to hande campaign status
  const { selectedCampaign, setSelectedCampaign } = useCampaignAssign();

  const handleCampaignChange = async (campaign: any) => {
    // fetch coupons assigned to that specific user in this campaign
    console.log(props.userId, campaign.campaignId);

    const response = await fetch(
      `/api/campaigns/${campaign.campaignId}/${props.userId}`
    );
    const ids = await response.json();
    console.log(ids);

    const liveCampaign = cloneDeep(campaign.campaign);

    liveCampaign.coupons.forEach((coupon: any) => {
      coupon.alreadyAssigned = ids.includes(coupon.id);
    });

    console.log(liveCampaign);

    // set state for the selected campaign
    setSelectedCampaign(liveCampaign);
  };

  return (
    <Card sx={{ minWidth: 200, marginTop: 8, overflow: "visible" }}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={props.username}
        src={props.userImage}
        className="m-auto -translate-y-6"
      />
      <CardContent className="-mt-14">
        <Typography>{props.username}</Typography>
        <Box component="div" className="flex items-center">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {props.userCampaigns.map((campaign: any) => (
                <FormControlLabel
                  key={campaign.campaignId}
                  value={campaign.campaignId}
                  control={<Radio />}
                  label={campaign.campaign.title}
                  onChange={() => handleCampaignChange(campaign)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box component="div">
          <CampaignAssignList
            userId={props.userId}
            selectedCampaign={selectedCampaign}
            setSelectedCampaign={setSelectedCampaign}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserRequest;
