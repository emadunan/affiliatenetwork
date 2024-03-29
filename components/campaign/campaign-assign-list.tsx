import React, { FC, Fragment, SyntheticEvent, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  Checkbox,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import {
  useApprovePendingReqMutation,
  useDeclinePendingReqMutation,
} from "../../services/campaign";

import AlertMsg, { Severity } from "../ui/alert-msg";
import DatePicker from "../ui/date-picker";
import dayjs, { Dayjs } from "dayjs";
import {
  SelectedCampaign,
  SelectedCoupon,
} from "../../interfaces/selected-campaign";

interface CampaignAssignListProps {
  direct?: boolean;
  userId: string;
  selectedCampaign: SelectedCampaign | undefined;
  setSelectedCampaign: React.Dispatch<
    React.SetStateAction<SelectedCampaign | undefined>
  >;
}

const CampaignAssignList: FC<CampaignAssignListProps> = ({
  direct,
  userId,
  selectedCampaign,
  setSelectedCampaign,
}) => {
  // Instantiate router hook
  const router = useRouter();

  // Handle Snakebar Alert State!
  const [alertSeverity, setAlertSeverity] = useState<Severity>("error");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isAlertMsgOpen, setIsAlertMsgOpen] = useState(false);

  const handleCloseAlertMsg = (
    _event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertMsgOpen(false);
  };

  // RTK Query AJAX calls
  const [setApproveReq, approveResponse] = useApprovePendingReqMutation();
  const [setDeclineReq, declineResponse] = useDeclinePendingReqMutation();

  // Handlers
  const handleCouponCheckChange = (couponId: string) => {
    setSelectedCampaign((prevState) => {
      // Ensure previous state is defined before manipulating it
      if (!prevState) return prevState;

      // Make deep copy from the coupons and find the checked one by id
      const prevStateCp = cloneDeep(prevState);
      const selectedCoupon = prevStateCp.coupons.find((c) => c.id === couponId);

      // Swap the check state for the selected coupon and update dates
      if (selectedCoupon) {
        selectedCoupon.checked = !selectedCoupon.checked;
        selectedCoupon.assignedAt = dayjs(new Date().toISOString());
        selectedCoupon.assignEndAt = null;
      }

      return prevStateCp;
    });
  };

  const handleCouponPercentChange = (couponId: string, newPercent: number) => {
    setSelectedCampaign((prevState) => {
      // Ensure previous state is defined before manipulating it
      if (!prevState) return prevState;

      const prevStateCp = cloneDeep(prevState);
      const selectedCoupon = prevStateCp.coupons.find((c) => c.id === couponId);

      // Update percent for the selected coupon
      if (selectedCoupon) {
        selectedCoupon.percent = newPercent;
      }

      return prevStateCp;
    });
  };

  const handleCouponAssignedAtChange = (
    assignedAt: Dayjs | null,
    couponId: string | undefined
  ) => {
    setSelectedCampaign((prevState) => {
      // Ensure previous state is defined before manipulating it
      if (!prevState) return prevState;

      const prevStateCp = cloneDeep(prevState);
      const selectedCoupon = prevStateCp.coupons.find((c) => c.id === couponId);

      // Update assignedAt date for the selected coupon
      if (selectedCoupon) {
        selectedCoupon.assignedAt = assignedAt;
      }

      return prevStateCp;
    });
  };

  const handleCouponAssignEndAtChange = (
    assignEndAt: Dayjs | null,
    couponId: string | undefined
  ) => {
    setSelectedCampaign((prevState) => {
      // Ensure previous state is defined before manipulating it
      if (!prevState) return prevState;

      const prevStateCp = cloneDeep(prevState);
      const selectedCoupon = prevStateCp.coupons.find((c) => c.id === couponId);

      // Update assignEndAt date for the selected coupon
      if (selectedCoupon) {
        selectedCoupon.assignEndAt = assignEndAt;
      }

      return prevStateCp;
    });
  };

  // Approve or Decline handlers
  const handleApproveCampaign = async () => {
    const checkedCoupons: SelectedCoupon[] = selectedCampaign!.coupons.filter(
      (coupon) => !!coupon.checked
    );

    if (checkedCoupons.length < 1) {
      setAlertMessage("You should select at least 1 item!");
      setIsAlertMsgOpen(true);
      return;
    }

    // Check that evey checked coupons have a percent in the range between 1 and 100
    const isPercentOutRange = checkedCoupons.find((coupon) => {
      if (!coupon.percent) return true;

      return coupon.percent < 1 || coupon.percent > 100;
    });

    if (isPercentOutRange) {
      setAlertMessage("The assigned percent out of range!");
      setIsAlertMsgOpen(true);
      return;
    }

    // Ensure that the AssignedAt date is always before the AssignEndAt date
    const isInvalidAssignDates = checkedCoupons.find((coupon) => {
      if (!coupon.assignedAt) {
        return true;
      } else if (coupon.assignedAt && !coupon.assignEndAt) {
        return false;
      } else if (coupon.assignedAt > coupon.assignEndAt!) {
        return true;
      } else {
        return false;
      }
    });

    if (isInvalidAssignDates) {
      setAlertMessage("Invalid assignation dates!");
      setIsAlertMsgOpen(true);
      return;
    }

    const reqData = {
      userId: userId,
      campaignId: selectedCampaign!.id,
      coupons: checkedCoupons,
    };

    if (direct) {
      // Handle direct assign
      const response = await fetch("/api/admin/assign-direct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      if (response.ok) {
        setAlertSeverity("success");
        setAlertMessage("The coupon assigned successfully!");
        setIsAlertMsgOpen(true);
      }

      setTimeout(() => {
        router.replace("/campaigns");
      }, 1000);
    } else {
      // Handle requested assign
      setApproveReq(reqData);
      setSelectedCampaign(undefined);
    }
  };

  const handleDeclineCampaign = () => {
    if (direct) {
      router.push("/campaigns");
    }

    setDeclineReq({ userId: userId, campaignId: selectedCampaign!.id });
    setSelectedCampaign(undefined);
  };

  return (
    <React.Fragment>
      <FormGroup>
        {selectedCampaign?.coupons.map((coupon) => (
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
            {coupon.checked && (
              <Fragment>
                <FormControl
                  sx={{ m: 1, width: "20ch" }}
                  variant="outlined"
                  size="medium"
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
                <DatePicker
                  label="Assign From"
                  value={coupon.assignedAt}
                  handleChange={(assignedAt: Dayjs | null) => {
                    handleCouponAssignedAtChange(assignedAt, coupon.id);
                  }}
                />
                <DatePicker
                  label="Assign Until"
                  value={coupon.assignEndAt}
                  handleChange={(assignEndAt: Dayjs | null) => {
                    handleCouponAssignEndAtChange(assignEndAt, coupon.id);
                  }}
                />
              </Fragment>
            )}
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
      <AlertMsg
        open={isAlertMsgOpen}
        handleClose={handleCloseAlertMsg}
        alertMessage={alertMessage}
        severity={alertSeverity}
      />
    </React.Fragment>
  );
};

export default CampaignAssignList;
