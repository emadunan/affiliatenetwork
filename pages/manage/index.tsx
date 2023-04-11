import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FC, Fragment, ReactNode, useState } from "react";
import BasicModal from "../../components/ui/modal";
import useModal from "../../hooks/use-modal";
import { ERROR_FALLBACK_MESSAGE } from "../../constants";

const Manage: FC = () => {
  const [boostinyUpdateSpinner, setBoostinyUpdateSpinner] = useState(false);
  const { handleOpen, handleClose, open } = useModal();

  const [content, setContent] = useState<ReactNode | undefined>();

  const onBoostinyCampaignUpdate = async () => {
    try {
      setBoostinyUpdateSpinner(true);
      const response = await fetch("/api/boostiny/campaigns", {
        method: "PATCH",
      });

      const result = await response.json();
      setBoostinyUpdateSpinner(false);

      const htmlNode = (
        <Fragment>
          <Typography component="p">{`New Campaigns: ${result.newCampaigns.length}`}</Typography>
          <Typography component="p">{`Expired Campaigns: ${result.expiredCampaigns.length}`}</Typography>
        </Fragment>
      );

      // Build Modal Content
      setContent(htmlNode);

      handleOpen();
    } catch (error: unknown) {
      setBoostinyUpdateSpinner(false);

      if (error instanceof Error) {
        setContent(<p>{error.message}</p>);
      } else {
        setContent(<p>{ERROR_FALLBACK_MESSAGE}</p>);
      }

      return handleOpen();
    }
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
        <BasicModal
          handleClose={handleClose}
          open={open}
          title={"Boostiny Update Report"}
          content={content || ""}
        />
      </Box>
    </Box>
  );
};

export default Manage;
