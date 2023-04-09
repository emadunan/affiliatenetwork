import React, { FC, SyntheticEvent, useState } from "react";
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
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { cloneDeep } from "lodash";

import { useRouter } from "next/router";

import {
  useApprovePendingReqMutation,
  useDeclinePendingReqMutation,
} from "../../services/campaign";

interface CampaignAssignListProps {
  direct?: boolean;
  userId: string;
  selectedCampaign: any;
  setSelectedCampaign: any;
}

const CampaignAssignList: FC<CampaignAssignListProps> = ({
  direct,
  userId,
  selectedCampaign,
  setSelectedCampaign,
}) => {
  // Instantiate router hook
  const router = useRouter();

  // Temporarly handle Snakebar here
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // RTK Query
  const [setApproveReq, approveResponse] = useApprovePendingReqMutation();
  const [setDeclineReq, declineResponse] = useDeclinePendingReqMutation();

  // Handlers
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

  const handleApproveCampaign = async () => {
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
    };

    const reqData = {
      userId: userId,
      campaignId: selectedCampaign.id,
      coupons: checkedCoupons,
    };

    if (direct) {
      // Handle direct assign
      await fetch("/api/admin/assign-direct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData)
      });

      router.push("/campaigns")
      
    } else {
      // Handle requested assign
      setApproveReq(reqData);
    }

    setSelectedCampaign(undefined);
  };

  const handleDeclineCampaign = () => {
    if (direct) {
      router.push("/campaigns");
    };

    setDeclineReq({ userId: userId, campaignId: selectedCampaign.id });
    setSelectedCampaign(undefined);
  };

  return (
    <React.Fragment>
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
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                label="Assigned Percent"
                onChange={(e) =>
                  handleCouponPercentChange(coupon.id, +e.target.value)
                }
              />
            </FormControl>
          </Box>
        ))}
      </FormGroup>
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
    </React.Fragment>
  );
};

export default CampaignAssignList;
