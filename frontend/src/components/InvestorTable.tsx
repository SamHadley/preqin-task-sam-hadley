import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Investor } from '../functions/types';
import { capitalizeWords, formatNumber } from '../functions/functions';

interface InvestorTableProps {
  investors: Investor[];
  selectedInvestor: Investor | null;
  onInvestorClick: (investor: Investor) => void;
}

const InvestorTable: React.FC<InvestorTableProps> = ({ investors, selectedInvestor, onInvestorClick }) => (
  <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, border: '1px solid #ddd' }}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
          {/* Render table headers */}
          {['Id', 'Name', 'Type', 'Date Added', 'Country', 'Total Commitment'].map(header => (
            <TableCell key={header} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Map over investors and render a row for each */}
        {investors.map((investor, index) => (
          <TableRow
            key={investor.id}
            hover
            onClick={() => onInvestorClick(investor)} // Handle investor row click
            sx={{
              backgroundColor: investor === selectedInvestor ? '#e0e0e0' : index % 2 === 0 ? '#f9f9f9' : '#ffffff',
              cursor: 'pointer', // Change cursor to pointer on hover
              '&:hover': { backgroundColor: '#d3d3d3' } // Apply hover effect
            }}
          >
            <TableCell sx={{ textAlign: 'center' }}>{investor.id}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{capitalizeWords(investor.name)}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{capitalizeWords(investor.type)}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{investor.date_added}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{investor.country}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{formatNumber(investor.total_commitment)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default InvestorTable;
