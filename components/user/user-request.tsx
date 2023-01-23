import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { cloneDeep } from "lodash";

import { FC, Fragment, SyntheticEvent, useEffect, useState } from "react";

import {
  useApprovePendingReqMutation,
  useDeclinePendingReqMutation,
} from "../../services/campaign";

import CloseIcon from "@mui/icons-material/Close";
// import { CampaignWithCoupons } from "@prisma/client/scalar";

// type CampaignWithCouponsPlus = CampaignWithCoupons & { checked: true | false, percent: number };

interface UserRequestProps {
  userId: string;
  username?: string;
  userImage?: string;
  userCampaigns?: any;
}

const UserRequest: FC<UserRequestProps> = (props) => {
  // Temporarly handle Snakebar here
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // RTK Query
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
    const checkedCoupons: any[] = selectedCampaign.coupons.filter(
      (coupon: any) => !!coupon.checked
    );

    if (checkedCoupons.length < 1) {
      setAlertMessage("You should select at least 1 item!");
      setOpen(true);
      return;
    }

    const isPercentOutRange = checkedCoupons.find((coupon: any) => {
      return coupon.percent < 1 || coupon.percent > 100;
    });

    if (isPercentOutRange) {
      setAlertMessage("The assigned percent out of range!");
      setOpen(true);
      return;
    }

    console.log(checkedCoupons);

    setApproveReq({
      userId: props.userId,
      campaignId: selectedCampaign.id,
      coupons: checkedCoupons,
    });

    setSelectedCampaign(undefined);
  };

  const handleDeclineCampaign = () => {
    setDeclineReq({ userId: props.userId, campaignId: selectedCampaign.id });
    setSelectedCampaign(undefined);
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
              {props.userCampaigns.map((c: any) => (
                <FormControlLabel
                  key={c.campaignId}
                  value={c.campaignId}
                  control={<Radio />}
                  label={c.campaign.title}
                  onChange={async () => {
                    // fetch coupons assigned to that specific user in this campaign
                    console.log(props.userId, c.campaignId);

                    const response = await fetch(
                      `/api/campaigns/${c.campaignId}/${props.userId}`
                    );
                    const ids = await response.json();
                    console.log(ids);

                    const liveCanpaign = cloneDeep(c.campaign);

                    liveCanpaign.coupons.forEach((coupon: any) => {
                      coupon.alreadyAssigned = ids.includes(coupon.id);
                    });

                    console.log(liveCanpaign);

                    // set state for the selected campaign
                    setSelectedCampaign(liveCanpaign);
                  }}
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
                      disabled={coupon.alreadyAssigned}
                    />
                  }
                  label={coupon.coupon}
                />
                <FormControl
                  sx={{ m: 1, width: "20ch" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel
                    htmlFor="assigned-percent"
                    hidden={coupon.alreadyAssigned}
                  >
                    Assigned Percent
                  </InputLabel>
                  <OutlinedInput
                    hidden={coupon.alreadyAssigned}
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
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
        <Button
          size="small"
          onClick={handleApproveCampaign}
          disabled={!selectedCampaign}
        >
          Approve
        </Button>
        <Button
          size="small"
          onClick={handleDeclineCampaign}
          disabled={!selectedCampaign}
        >
          Decline
        </Button>
      </CardActions>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default UserRequest;
