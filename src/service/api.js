export const API_ENDPOINTS = {
  BITCOIN_NEWS_SENTIMENT: '/bitcoin-news-sentiment',
  SIMULATE_BACKTEST: "http://localhost:8000/api/v1/backtest/simulate-trade",
  // Add other endpoints here as needed
};

  const apiService = {
    // Generic request method with debug logs
    async request(path, options = {}) {
      try {
        console.log(`Requesting ${path} with options:`, options); // this line will show
        const response = await fetch(path, options);
        
        // Log the raw response
        console.log(`Response from ${path}:`, response); //this won't show le
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Error data from response:', errorData); // Log the error data
          throw new Error(errorData?.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Log the successful response data
        return data;
      } catch (error) {
        console.error(`Error fetching from ${path}:`, error); // Log any caught errors
        alert("Error fetching from backend: " + error.message); // Show user-friendly error
        throw error;
      }
    },
  

  
  // Specific API methods
  getBitcoinNewsSentiment() {
    console.log('Fetching Bitcoin News Sentiment...');
    return this.request(API_ENDPOINTS.BITCOIN_NEWS_SENTIMENT);
  },
  
  // Simulate backtest method with logging
  simulateBacktest(payload) {
    console.log('Simulating backtest with payload:', payload);
    return this.request(API_ENDPOINTS.SIMULATE_BACKTEST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }
};

export default apiService;
