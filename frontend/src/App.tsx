import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Investor, CommitmentsResponse, AssetClassTotals } from './functions/types';
import { fetchInvestors, fetchTotalByAssetClass, fetchCommitments } from './functions/api';
import InvestorTable from './components/InvestorTable';
import AssetClassButtons from './components/AssetClassButtons';
import CommitmentsTable from './components/CommitmentsTable';

const App: React.FC = () => {
  // State to store fetched list of investors
  const [investors, setInvestors] = useState<Investor[]>([]);
  // State to store currently selected investor
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  // State to store commitments data for the selected investor
  const [commitments, setCommitments] = useState<CommitmentsResponse | null>(null);
  // State to store asset class totals for the selected investor
  const [assetClassTotals, setAssetClassTotals] = useState<AssetClassTotals | null>(null);

  // useEffect hook to fetch investors on component mount
  useEffect(() => {
    const loadInvestors = async () => {
      try {
        setInvestors(await fetchInvestors()); // Fetch the list of investors
      } catch (error) {
        console.error('Error fetching investors:', error); // Log error if fetching fails
      }
    };
    loadInvestors();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle click on an investor
  const handleInvestorClick = async (investor: Investor) => {
    setSelectedInvestor(investor); // Set the selected investor
    try {
      // Fetch and set asset class totals for the selected investor
      setAssetClassTotals(await fetchTotalByAssetClass(investor.id));
      // Fetch and set commitments for the selected investor
      setCommitments(await fetchCommitments(investor.id));
    } catch (error) {
      console.error('Error fetching commitments:', error); // Log error if fetching fails
    }
  };

  // Handle click on an asset class button to filter commitments by asset class
  const handleAssetClassClick = async (assetClass: string) => {
    if (selectedInvestor) {
      try {
        // Fetch and set commitments for the selected investor filtered by asset class
        setCommitments(await fetchCommitments(selectedInvestor.id, assetClass));
      } catch (error) {
        console.error('Error fetching filtered commitments:', error); // Log error if fetching fails
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Investors</Typography>

      {/* Render the InvestorTable component */}
      <InvestorTable 
        investors={investors} 
        selectedInvestor={selectedInvestor} 
        onInvestorClick={handleInvestorClick} 
      />

      {/* Conditionally render AssetClassButtons and CommitmentsTable if an investor is selected */}
      {selectedInvestor && assetClassTotals && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            Commitments for {selectedInvestor.name}
          </Typography>
          <AssetClassButtons 
            assetClassTotals={assetClassTotals.total_by_asset_class} 
            onAssetClassClick={handleAssetClassClick} 
          />
          <CommitmentsTable commitments={commitments} />
        </Box>
      )}
    </div>
  );
};

export default App;
