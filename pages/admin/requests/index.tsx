import { Box } from "@mui/material";
import { FC } from "react";
import UserRequestsList from "../../../components/user/user-requests-list";
import { useGetUsersCampaignsReqQuery } from "../../../services/campaign";

const Requests: FC = () => {
  const { data, isLoading } = useGetUsersCampaignsReqQuery();

  return (
    <Box component="div">
      <UserRequestsList users={data} />
    </Box>
  );
};

export default Requests;
