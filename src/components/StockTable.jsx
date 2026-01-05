function StockTable({ stocks }) {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No stock data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <th className="py-4 px-6 text-left font-semibold">Symbol</th>
            <th className="py-4 px-6 text-right font-semibold">Current Price</th>
            <th className="py-4 px-6 text-right font-semibold">Change</th>
            <th className="py-4 px-6 text-right font-semibold">Change %</th>
            <th className="py-4 px-6 text-right font-semibold">High</th>
            <th className="py-4 px-6 text-right font-semibold">Low</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr 
              key={stock.symbol} 
              className={`
                border-b border-gray-200 
                hover:bg-blue-50 
                transition-colors
                ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              `}
            >
              <td className="py-4 px-6 font-bold text-lg text-gray-800">
                {stock.symbol}
              </td>
              
              <td className="py-4 px-6 text-right text-gray-700 font-semibold">
                ${stock.price?.toFixed(2) || 'N/A'}
              </td>
              
              <td className={`py-4 px-6 text-right font-semibold ${
                stock.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.change >= 0 ? '▲' : '▼'} 
                {stock.change >= 0 ? '+' : ''}
                {stock.change?.toFixed(2) || 'N/A'}
              </td>
              
              <td className={`py-4 px-6 text-right font-semibold ${
                stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.changePercent >= 0 ? '+' : ''}
                {stock.changePercent?.toFixed(2) || 'N/A'}%
              </td>
              
              <td className="py-4 px-6 text-right text-gray-600">
                ${stock.high?.toFixed(2) || 'N/A'}
              </td>
              
              <td className="py-4 px-6 text-right text-gray-600">
                ${stock.low?.toFixed(2) || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;