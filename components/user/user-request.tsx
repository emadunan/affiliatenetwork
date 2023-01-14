import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { cloneDeep } from "lodash";

import { FC, useEffect, useState } from "react";

import {
  useApprovePendingReqMutation,
  useDeclinePendingReqMutation,
} from "../../services/camaign";
// import { CampaignWithCoupons } from "@prisma/client/scalar";

// type CampaignWithCouponsPlus = CampaignWithCoupons & { checked: true | false, percent: number };

interface UserRequestProps {
  userId: string;
  username?: string;
  userImage?: string;
  userCampaigns?: any;
}

const UserRequest: FC<UserRequestProps> = (props) => {
  const [setApproveReq, approveResponse] = useApprovePendingReqMutation();
  const [setDeclineReq, declineResponse] = useDeclinePendingReqMutation();

  const [selectedCampaign, setSelectedCampaign] = useState<any | undefined>();

  useEffect(() => {
    if (selectedCampaign) {
      selectedCampaign.coupons.forEach((coupon: any) => {
        if (!coupon.checked) {
          coupon.checked = false;
        }

        if (!coupon.percent) {
          coupon.percent = 0;
        }
      });
    }
  }, [selectedCampaign]);

  const handleCouponCheckChange = (couponId: string) => {
    setSelectedCampaign((prevState: any) => {
      const prevStateCp = cloneDeep(prevState);
      const selectedCoupon = prevStateCp.coupons.find(
        (c: any) => c.id === couponId
      );

      selectedCoupon.checked = !selectedCoupon.checked;
      return prevStateCp;
    });
  };

  const handleCouponPercentChange = (couponId: string, newPercent: number) => {
    setSelectedCampaign((prevState: any) => {
      const prevStateCp = cloneDeep(prevState);
      const selectedCoupon = prevStateCp.coupons.find(
        (c: any) => c.id === couponId
      );

      selectedCoupon.percent = newPercent;
      return prevStateCp;
    });
  };

  const handleApproveCampaign = () => {
    const checkedCoupons = selectedCampaign.coupons.filter(
      (coupon: any) => !!coupon.checked
    );
    setApproveReq({
      userId: props.userId,
      campaignId: selectedCampaign.id,
      coupons: checkedCoupons,
    });
  };

  const handleDeclineCampaign = () => {
    setDeclineReq({ userId: props.userId, campaignId: selectedCampaign.id });
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
                  onChange={() => setSelectedCampaign(cloneDeep(c.campaign))}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box component="div">
          <FormGroup>
            {selectedCampaign?.coupons.map((coupon: any) => (
              <Box component="div" className="flex" key={coupon.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleCouponCheckChange(coupon.id)}
                    />
                  }
                  label={coupon.coupon}
                />
                <FormControl
                  sx={{ m: 1, width: "20ch" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel htmlFor="assigned-percent">
                    Assigned Percent
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    inputProps={{ min: 10, max: 50, step: 5 }}
                    id="assigned-percent"
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    label="Assigned Percent"
                    onChange={(e) =>
                      handleCouponPercentChange(coupon.id, +e.target.value)
                    }
                  />
                </FormControl>
              </Box>
            ))}
            {/* <FormControlLabel control={<Checkbox />} label="Label" /> */}
          </FormGroup>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleApproveCampaign}>
          Approve
        </Button>
        <Button size="small" onClick={handleDeclineCampaign}>
          Decline
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserRequest;
