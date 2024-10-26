import React from 'react';
import { Button, Box } from '@mui/material';
import { formatNumber } from '../functions/functions';

interface AssetClassButtonsProps {
  assetClassTotals: { [key: string]: number };
  onAssetClassClick: (assetClass: string) => void;
}

const AssetClassButtons: React.FC<AssetClassButtonsProps> = ({ assetClassTotals, onAssetClassClick }) => (
  <Box
    mb={2}
    sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
  >
    {/* Map over asset classes to render a button for each */}
    {Object.entries(assetClassTotals).map(([assetClass, total], index) => (
      <Button
        key={index}
        variant="contained"
        color="primary"
        style={{ marginRight: '10px', marginBottom: '10px', textAlign: 'center' }}
        onClick={() => onAssetClassClick(assetClass)} // Trigger asset class filter on click
      >
        {assetClass}
        <br />
        £{formatNumber(total)} {/* Format the total amount */}
      </Button>
    ))}
  </Box>
);

export default AssetClassButtons;
