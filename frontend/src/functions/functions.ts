import numeral from 'numeral';

// Capitalize the first letter of each word in a string
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase()); // Use regex to find word boundaries and capitalize each word
};

// Format large numbers into a human-readable format (e.g., 2.43B for billion)
export const formatNumber = (value: number): string => {
  return numeral(value).format('£0.0a').toUpperCase(); // Format the number using numeral.js
};
