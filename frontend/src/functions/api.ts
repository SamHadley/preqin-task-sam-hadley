import axios from 'axios';
import { Investor, CommitmentsResponse, AssetClassTotals } from './types';

const baseURL = 'http://localhost:8000'; // Base URL for the API

// Fetch the list of investors from the backend
export const fetchInvestors = async (): Promise<Investor[]> => {
  const response = await axios.get<{ investors: Investor[] }>(`${baseURL}/investors`);
  return response.data.investors; // Return the fetched list of investors
};

// Fetch total commitments by asset class for a specific investor
export const fetchTotalByAssetClass = async (investorId: number): Promise<AssetClassTotals> => {
  const response = await axios.get<AssetClassTotals>(`${baseURL}/investors/${investorId}/commitments/total_by_asset_class`);
  return response.data; // Return asset class totals for the given investor
};

// Fetch commitments for a specific investor, optionally filtered by asset class
export const fetchCommitments = async (investorId: number, assetClass?: string): Promise<CommitmentsResponse> => {
  // Build the URL conditionally based on whether asset class filtering is needed
  const url = assetClass ? `${baseURL}/investors/${investorId}/commitments?asset_class=${assetClass}` : `${baseURL}/investors/${investorId}/commitments`;
  const response = await axios.get<CommitmentsResponse>(url);
  return response.data; // Return the commitments data
};
