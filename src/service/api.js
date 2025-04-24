export const API_ENDPOINTS = {
  BITCOIN_NEWS_SENTIMENT: '/bitcoin-news-sentiment',
  SIMULATE_BACKTEST: "/api/v1/backtest/simulate-trade",
  // Add other endpoints here as needed
};

const apiService = {
  // Default backend URL
  defaultBackendUrl: 'http://localhost:8001',
  
  // Generic request method with debug logs
  async request(path, options = {}) {
    try {
      // Use the baseUrl from options if provided, otherwise use default path
      const fullUrl = options.baseUrl ? `${options.baseUrl}${path}` : path;
      
      // Remove the baseUrl from options before sending request
      if (options.baseUrl) {
        const { ...restOptions } = options;
        options = restOptions;
      }
      
      console.log(`Requesting ${fullUrl} with options:`, options);
      const response = await fetch(fullUrl, options);
      
      // Log the raw response
      console.log(`Response from ${fullUrl}:`, response);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error data from response:', errorData);
        throw new Error(errorData?.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching from ${path}:`, error);
      throw error;
    }
  },

  // Specific API methods
  getBitcoinNewsSentiment() {
    console.log('Fetching Bitcoin News Sentiment...');
    return this.request(API_ENDPOINTS.BITCOIN_NEWS_SENTIMENT);
  },
  
  // Enhanced simulate backtest method that can target different backends
  simulateBacktest(customPayload = null) {
    // Default payload structure
    const defaultPayload = {
      strategyName: "mean_reversion",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      initialCapital: 10000,
      commissionRate: 0.001,
      minCommission: 0.0,
      allowForwardTest: false,
      allowPermutation: false,
      assets: ["btc"],
      runtimeMode: "backtest",
      entryExitMode: "mean-reversion",
      positionSizingMode: "fixed",
      maxPositionSize: 1.0,
      stopLoss: 0.2,
      takeProfit: 0.2,
    };
    
    // Use provided payload or default
    const payload = customPayload || defaultPayload;
    console.log('Simulating backtest with payload:', payload);
    
    // Determine which backend to use
    let baseUrl;
    
      baseUrl = 'http://localhost:8000';
   
    
    return this.request(API_ENDPOINTS.SIMULATE_BACKTEST, {
      baseUrl,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(error => {
      alert("Error running backtest: " + error.message);
      throw error;
    });
  }
};

export default apiService;