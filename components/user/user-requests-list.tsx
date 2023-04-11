import { Box } from "@mui/material";
import { FC } from "react";
import UserRequest from "./user-request";
import { UserWzCampaignsWzCoupons } from "@prisma/client/scalar";

interface UserRequestsListProps {
  users?: UserWzCampaignsWzCoupons[];
}

const UserRequestsList: FC<UserRequestsListProps> = ({ users }) => {
  return (
    <Box component="ul">
      {users?.map((user) => (
        <UserRequest
          key={user.id}
          userId={user.id}
          username={user.name!}
          userImage={user.image!}
          userCampaigns={user.userCampaigns}
        />
      ))}
    </Box>
  );
};

export default UserRequestsList;
