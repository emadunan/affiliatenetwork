import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { CampaignWithUser } from "@prisma/client/scalar";
import {
  useGetUserCampaignsQuery,
  useMakeCampaignRequestMutation,
} from "../../services/campaign";
import router from "next/router";

interface CampaignTableProps {
  campaigns: CampaignWithUser[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const { data: session } = useSession();

  const { data: userWithcampaigns, isLoading } = useGetUserCampaignsQuery(
    session?.user.userId
  );

  const [setCampaignRequest, response] = useMakeCampaignRequestMutation();

  const handleMakeRequest = (campaignId: string) => {
    const userId = session?.user.userId;

    setCampaignRequest({ userId, campaignId });
  };

  // Evaluate campaign against the current user request state and return the appropriate element
  const getReqStatus = (userCampaigns: any[], campaignId: string) => {
    const userCampaignsLen = userCampaigns.length;
    const userCampaignReq: any = userCampaigns.find((item) => {
      return (
        item.userId === session?.user.userId && item.status === "pending"
        // || item.status === "approved" || item.status === "declined"
      );
    });

    if (userCampaignsLen && userCampaignReq) {
      return (
        <Box component="span" color="#BE3F3F">
          {userCampaignReq.status}
        </Box>
      );
    } else {
      return (
        <Button
          variant="outlined"
          onClick={(_e) => handleMakeRequest(campaignId)}
          disabled={
            userWithcampaigns?.userCampaigns.length! >=
            userWithcampaigns?.userMeta?.reqNumber!
          }
        >
          Request a coupon
        </Button>
      );
    }
  };

  if (!session?.user.privilege) {
    return (
      <div>
        Please register that you can start make requests or if you have just
        registered refresh the page!
      </div>
    );
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
            {session?.user.privilege === "publisher" && (
              <TableCell align="center">Items</TableCell>
            )}
            {session?.user.privilege === "publisher" && (
              <TableCell align="right"></TableCell>
            )}
            {session?.user.privilege === "admin" && (
              <TableCell align="center">Assign</TableCell>
            )}
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
                  {row.userCampaigns
                    .find((c) => c.campaignId === row.id)
                    ?.user.userCoupons.filter(
                      (userCoupon) =>
                        userCoupon.coupon.campaignId === row.id &&
                        userCoupon.userId === session?.user.userId
                    )
                    .map((el) => (
                      <Typography component="span" key={el.couponId}>
                        {el.coupon.coupon},{" "}
                      </Typography>
                    ))}
                </TableCell>
              )}

              {session?.user.privilege === "publisher" && (
                <TableCell align="center">
                  {getReqStatus(row.userCampaigns, row.id)}
                </TableCell>
              )}
              {session?.user.privilege === "admin" && (
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => router.push("/campaigns/assign")}>Assign</Button>
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
