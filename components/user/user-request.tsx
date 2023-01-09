import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { FC, useState } from "react";

interface UserRequestProps {
  username?: string;
  userImage?: string;
  userCampaigns?: any;
}

const UserRequest: FC<UserRequestProps> = (props) => {
  const [selectedCampaign, setSelectedCampaign] = useState<any | undefined>();
  const [availableCoupons, setAvailableCoupons] = useState<any[] | undefined>([]);
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
            {/* <FormLabel id="demo-row-radio-buttons-group-label">Campaigns</FormLabel> */}
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {props.userCampaigns.map((c: any) => (
                <FormControlLabel
                  key={c.campaignId}
                  value={c.campaignId}
                  control={<Radio />}
                  label={c.campaign.title}
                  onChange={() => setSelectedCampaign(c.campaign)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box component="div">
          <FormGroup className="flex flex-row">
            {selectedCampaign?.coupons.map((coupon: any) => <FormControlLabel control={<Checkbox />} label={coupon.coupon} />)}
            {/* <FormControlLabel control={<Checkbox />} label="Label" /> */}
          </FormGroup>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Approve</Button>
        <Button size="small">Decline</Button>
      </CardActions>
    </Card>
  );
};

export default UserRequest;
