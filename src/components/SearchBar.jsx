import { useState } from 'react';

function SearchBar({ onSearch }) { // search func. passed as prop
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    if (symbol.trim()) {
      onSearch(symbol.trim().toUpperCase());
      setSymbol(''); // clear input after search entered
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 max-w-md">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g. AAPL)"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
            font-semibold rounded-lg transition-colors disabled:bg-gray-400"
          disabled={!symbol.trim()} // cannot interact when search bar empty
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;