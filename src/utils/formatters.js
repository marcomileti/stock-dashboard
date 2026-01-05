// functions needed to format data clearly and concisely 

// adds dollar sign to price
export const formatPrice = (price) => {
    return `$ ${price.ToFixed(2)}`;
}

// adds percent sign and numerical sign to price
export const formatPercent = (percent) => {
    // if sign < 0, negative is preserved in string literal
    const sign = percent >= 0 ? "+" : ""; 
    return `${sign}${percent.toFixed(2)}%`;
};

// finds time passed since given timestamp
export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(timestamp)) / 1000 / 60);
  
  if (diff < 1) return 'Just now';
  if (diff === 1) return '1 minute ago';
  if (diff < 60) return `${diff} minutes ago`;
  return 'Over an hour ago';
};