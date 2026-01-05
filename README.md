# Stock Price Dashboard - Marco Mileti

FEATURES
- Real-time stock price tracking
- Search functionality
- API Key Security
- Error Handling 
- Loading Screen 

TEACH STACK
- React 18 (JavaScript ES6+)
- Tailwind CSS
- Finnhub API

SETUP INSTRUCTIONS
1. Clone repository
2. `npm install` in a new terminal

BEYOND CORE REQUIREMENTS
- The Finnhub API key is stored in a .env file to avoid committing it to GitHub. Since this is a client-side app, the key is still exposed in the browser. For full security, API requests should go through a server or serverless function.
- Stock search feature that automatically adds a row the table if the entered stock is valid
- Unique error handling for bad inputs, complete with a frontend notification about the specific kind of error
- Loading screen with animation done entirely in Tailwind 

## Future Improvements
- Interactive chart feature
- Portfolio tracking
- Historical data views
- Simulations (Variational Interference, Monte Carlo, etc.)