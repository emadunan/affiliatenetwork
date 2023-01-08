import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import { FC } from "react";

interface UserRequestProps {
  user?: any;
  campaignId?: number;
}

const CampaignsEx = ["noon", "active", "puma"]

const UserRequest: FC<UserRequestProps> = () => {
  return (
    <Card sx={{ minWidth: 200, marginTop: 8, overflow: "visible" }}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        className="m-auto -translate-y-6"
      />
      <CardContent className="-mt-14">
        <Typography>Remy Sharp</Typography>
        <Box component="div" className="flex items-center">
          <FormControl>
            {/* <FormLabel id="demo-row-radio-buttons-group-label">Campaigns</FormLabel> */}
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {CampaignsEx.map(c => (
                <FormControlLabel value={c} control={<Radio />} label={c} />
              ))}
            </RadioGroup>
          </FormControl>
          <Button size="small">Assign</Button>
          <Button size="small">Decline</Button>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Approve</Button>
        <Button size="small">Cancel</Button>
      </CardActions>
    </Card>
  );
};

export default UserRequest;
