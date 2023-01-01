import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { CampaignWithUser } from "@prisma/client/scalar";
import { useMakeCampaignRequestMutation } from "../../services/camaign";

interface CampaignTableProps {
  campaigns: CampaignWithUser[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const { data: session } = useSession();

  const [setCampaignRequest, response] = useMakeCampaignRequestMutation();

  const handleMakeRequest = (campaignId: string) => {
    const userId = session?.user.userId;
    setCampaignRequest({ userId, campaignId });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="text-xl">
              #
            </TableCell>
            <TableCell align="center" className="text-xl">
              Name
            </TableCell>
            <TableCell align="center" className="text-xl">
              Category
            </TableCell>
            <TableCell align="right" className="text-xl"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((row, idx) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="left"
                className="text-xl"
              >
                {idx + 1}
              </TableCell>
              <TableCell align="center" className="text-xl">
                {row.title}
              </TableCell>
              <TableCell align="center" className="text-xl">
                {row.category}
              </TableCell>
              <TableCell align="right" className="text-xl">
                {row.userCampaigns?.length &&
                row.userCampaigns.find(
                  (item) => item.userId === session?.user.userId
                ) ? (
                  "Pendding"
                ) : (
                  <Button
                    variant="outlined"
                    onClick={(_e) => handleMakeRequest(row.id)}
                  >
                    Make a Request
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignTable;
