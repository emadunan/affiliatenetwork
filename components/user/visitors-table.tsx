import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserWithMeta } from '@prisma/client/scalar';
import { Avatar } from '@mui/material';

interface VisitorsTableProps {
  users: UserWithMeta[];
}

const VisitorsTable: React.FC<VisitorsTableProps> = (props) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell></TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell><Avatar alt={row.UserMeta?.firstName} src={row.image as string}/></TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VisitorsTable;