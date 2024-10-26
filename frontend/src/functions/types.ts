// Define the structure for an Investor object
export interface Investor {
  id: number;
  name: string;
  type: string;
  date_added: string;
  country: string;
  total_commitment: number;
}

// Define the structure for a Commitment object
export interface Commitment {
  id: number;
  asset_class: string;
  amount: number;
  currency: string;
}

// Define the structure for a response containing a list of commitments
export interface CommitmentsResponse {
  commitments: Commitment[];
}

// Define the structure for asset class totals, using a key-value map
export interface AssetClassTotals {
  total_by_asset_class: Record<string, number>; // Key: asset class name, Value: total amount
}
