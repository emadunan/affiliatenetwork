import { Box } from "@mui/material";
import { FC } from "react";
import UserRequestsList from "../../../components/user/user-requests-list";
import { useGetUsersCampaignsReqQuery } from "../../../services/camaign";

const Requests: FC = () => {
  const { data, isLoading } = useGetUsersCampaignsReqQuery();
  console.log(data);
  
  return (
    <Box component="div">
      <UserRequestsList users={data}/>
    </Box>
  );
};

export default Requests;
