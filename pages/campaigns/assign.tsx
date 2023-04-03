import { Box } from "@mui/material";
import { FC } from "react";
import UserSelect from "../../components/user/user-select";

interface CampaignAssignProps {
  
}
 
const CampaignAssign: FC<CampaignAssignProps> = () => {
  return (
    <Box component="div">
      <UserSelect />
    </Box>
  );
}
 
export default CampaignAssign;