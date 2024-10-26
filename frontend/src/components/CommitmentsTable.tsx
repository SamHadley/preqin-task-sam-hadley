import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CommitmentsResponse } from '../functions/types';
import { formatNumber } from '../functions/functions';

interface CommitmentsTableProps {
  commitments: CommitmentsResponse | null;
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ commitments }) => (
  <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, border: '1px solid #ddd' }}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
          {/* Render table headers */}
          {['Id', 'Asset Class', 'Amount', 'Currency'].map(header => (
            <TableCell key={header} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Map over commitments and render a row for each */}
        {commitments?.commitments.map((commitment, index) => (
          <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
            <TableCell sx={{ textAlign: 'center' }}>{commitment.id}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{commitment.asset_class}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{formatNumber(commitment.amount)}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{commitment.currency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CommitmentsTable;
