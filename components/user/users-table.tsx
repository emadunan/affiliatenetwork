import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserWithMeta } from "@prisma/client/scalar";
import { Avatar, IconButton, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRouter } from "next/router";

interface UsersTableProps {
  users: UserWithMeta[];
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
  const router = useRouter();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell></TableCell>
            <TableCell align="center">E-Mail</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Max Requests</TableCell>
            <TableCell align="center">Campaigns</TableCell>
            <TableCell align="center">Coupons</TableCell>
            <TableCell align="center">Last Visit</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell>
                <Avatar
                  alt={row.userMeta?.firstName}
                  src={row.image as string}
                />
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.userMeta?.firstName}</TableCell>
              <TableCell align="center">{row.userMeta?.lastName}</TableCell>
              <TableCell align="center">{row.userMeta?.city}</TableCell>
              <TableCell align="center">{row.userMeta?.reqNumber}</TableCell>
              <TableCell align="center">
                {row.userCampaigns?.map((c) => (
                  <Typography
                    component="span"
                    key={c.userId.concat(c.campaignId)}
                  >
                    {c.campaign.title},{" "}
                  </Typography>
                ))}
              </TableCell>
              <TableCell align="center">
                {row.userCoupons?.map((c) => (
                  <Typography
                    component="span"
                    key={c.userId.concat(c.couponId)}
                  >
                    {c.coupon.coupon},{" "}
                  </Typography>
                ))}
              </TableCell>
              <TableCell align="center">{`${new Date(
                row.userMeta?.last_login!
              ).toLocaleDateString()} | ${new Date(
                row.userMeta?.last_login!
              ).toLocaleTimeString()}`}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => router.push(`/users/${row.id}`)}
                >
                  <ManageAccountsIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
