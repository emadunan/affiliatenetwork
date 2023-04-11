import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { cloneDeep } from "lodash";

import { FC } from "react";
import useCampaignAssign from "../../hooks/use-campaign-assign";
import CampaignAssignList from "../campaign/campaign-assign-list";
import { UserCampaignWzCampaignWzCoupons } from "@prisma/client/scalar";
import { SelectedCampaign } from "../../interfaces/selected-campaign";

interface UserRequestProps {
  userId: string;
  username?: string;
  userImage?: string;
  userCampaigns?: UserCampaignWzCampaignWzCoupons[];
}

const UserRequest: FC<UserRequestProps> = (props) => {
  // Use Hook to hande campaign status
  const { selectedCampaign, setSelectedCampaign } = useCampaignAssign();

  const handleCampaignChange = async (
    userCampaign: UserCampaignWzCampaignWzCoupons
  ) => {
    // fetch coupons assigned to that specific user in this campaign
    const response = await fetch(
      `/api/campaigns/${userCampaign.campaignId}/${props.userId}`
    );
    const ids = await response.json();

    const liveCampaign: SelectedCampaign = cloneDeep(userCampaign.campaign);

    liveCampaign.coupons.forEach((coupon) => {
      coupon.alreadyAssigned = ids.includes(coupon.id);
    });

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
              {props.userCampaigns!.map((userCampaign) => (
                <FormControlLabel
                  key={userCampaign.campaignId}
                  value={userCampaign.campaignId}
                  control={<Radio />}
                  label={userCampaign.campaign.title}
                  onChange={() => handleCampaignChange(userCampaign)}
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
