// **client-side** stock API fetching logic
// ----------------------------------------

import { FINNHUB_BASE_URL, defaultStocks } from "../utils/constants";

const FINNHUB_API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;

// fetch data for a single stock
export const fetchStockQuote = async (symbol) => {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${symbol}: ${response.status}`);
    }
    
    const data = await response.json();

    // check for empty or nonexistent stock
    if (data.c === 0 || data.c === null || data.c === undefined) {
      throw new Error(`Invalid or unknown stock symbol: ${symbol}`);
    }

    return {
      symbol,                  // stock symbol
      price: data.c,           // current price
      change: data.d,          // change in dollars
      changePercent: data.dp,  // change percent
      high: data.h,            // high price of day
      low: data.l,             // low price of day
      open: data.o,            // open price
      previousClose: data.pc   // previous close price
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    throw error;
  }
};

// fetch data for multiple stocks simultaneously
export const fetchMultipleStocks = async (symbols = defaultStocks) => {
  try {
    // create array of fetch promises for all symbols
    const promises = symbols.map(symbol => 
      fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${symbol}`);
          }
          return response.json();
        })
        .then(data => ({
          symbol,
          price: data.c,           
          change: data.d,         
          changePercent: data.dp,  
          high: data.h,           
          low: data.l,            
          open: data.o,          
          previousClose: data.pc  
        }))
        .catch(error => {
          console.error(`Error fetching ${symbol}:`, error);
          // return null for failed stocks so others still work
          return null;
        })
    );
    
    // wait for all requests to complete
    const results = await Promise.all(promises);
    
    // Filter out any failed requests (null values)
    return results.filter(stock => stock !== null);
  } catch (error) {
    console.error('Error fetching multiple stocks:', error);
    throw error;
  }
};

// export const searchStocks = async (query) => {
//   const url = `${FINNHUB_BASE_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`;
  
//   try {
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error('Search failed');
//     }
    
//     const data = await response.json();
//     return data.result || [];
//   } catch (error) {
//     console.error('Error searching stocks:', error);
//     throw error;
//   }
// };


