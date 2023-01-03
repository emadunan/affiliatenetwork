import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { CampaignWithUser } from "@prisma/client/scalar";
import { useGetUserCampaignsQuery, useMakeCampaignRequestMutation } from "../../services/camaign";

interface CampaignTableProps {
  campaigns: CampaignWithUser[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const { data: session } = useSession();

  const { data: userWithcampaigns, isLoading } = useGetUserCampaignsQuery(session?.user.userId);

  const [setCampaignRequest, response] = useMakeCampaignRequestMutation();

  const handleMakeRequest = (campaignId: string) => {
    const userId = session?.user.userId;
    setCampaignRequest({ userId, campaignId });
  };

  if (!session?.user.privilege) {
    return "Please register that you can start make requests or if you have just registered refresh the page!"
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="center">Logo</TableCell>
            <TableCell align="center">Name</TableCell>
            {session?.user.privilege === "admin" && (
              <TableCell align="center">Manager</TableCell>
            )}
            {session?.user.privilege === "admin" && (
              <TableCell align="center">Network</TableCell>
            )}
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((row, idx) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {idx + 1}
              </TableCell>
              <TableCell align="center">
                <Avatar alt={row.title} src={row.logo || ""} />
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              {session?.user.privilege === "admin" && (
                <TableCell align="center">{row.campaign_manager}</TableCell>
              )}
              {session?.user.privilege === "admin" && (
                <TableCell align="center">{row.network_name}</TableCell>
              )}
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.campaign_type}</TableCell>
              {session?.user.privilege === "publisher" && (
                <TableCell align="center">
                  {row.userCampaigns?.length &&
                    row.userCampaigns.find(
                      (item) => item.userId === session?.user.userId
                    ) ? (
                    <Typography component="span" color="#BE3F3F">Pendding</Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={(_e) => handleMakeRequest(row.id)}
                      disabled={userWithcampaigns?.userCampaigns.length! > 2}
                    >
                      Make a Request
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignTable;
