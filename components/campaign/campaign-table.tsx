import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

interface CampaignTableProps {
  campaigns: any[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="text-xl">#</TableCell>
            <TableCell align="center" className="text-xl">Name</TableCell>
            <TableCell align="center" className="text-xl">Category</TableCell>
            <TableCell align="right" className="text-xl"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((row, idx) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left" className="text-xl">
                {idx + 1}
              </TableCell>
              <TableCell align="center" className="text-xl">{row.title}</TableCell>
              <TableCell align="center" className="text-xl">{row.category}</TableCell>
              <TableCell align="right" className="text-xl">
                <Button variant='outlined'>Make a Request</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CampaignTable;