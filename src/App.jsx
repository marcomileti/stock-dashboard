import { useState, useEffect } from "react";
import { fetchMultipleStocks, fetchStockQuote } from './services/stockAPI';
import StockTable from './components/StockTable';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import Error from './components/Error';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const loadStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMultipleStocks();
      console.log("stocks fetched!");
      setStocks(data); // updates value of stocks
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStocks();
  }, []);

  const handleSearch = async (symbol) => {
    setSearchError(null);
    
    // checking if the stock is already in the table
    if (stocks.some(s => s.symbol === symbol)) {
      setSearchError(`${symbol} is already in the list`);
      return <Error message={`${symbol} is already in the list`} onRetry={loadStocks} />;
  
    }

    try {
      const newStock = await fetchStockQuote(symbol);
      setStocks([newStock, ...stocks]); // add to top of list
    } catch (err) {
      setSearchError(`Could not find stock: ${symbol}`);
      return <Error message={`Could not find stock: ${symbol}`} onRetry={loadStocks} />;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Error message={error} onRetry={loadStocks} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Stock Dashboard</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {searchError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {searchError}
        </div>
      )}

      <StockTable stocks={stocks} />
      
      <h3 className="text-gray-400 py-3">Marco Mileti 2026</h3>

    </div>

  );
}

export default App;