
export const API_ENDPOINTS = {
  BITCOIN_NEWS_SENTIMENT: '/bitcoin-news-sentiment',
  // Add other endpoints here as needed
};

const apiService = {
  // Generic request method
  async request(path, options = {}) {
    try {
      const response = await fetch(`${path}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${path}:`, error);
      throw error;
    }
  },
  
  // Specific API methods
  getBitcoinNewsSentiment() {
    return this.request(API_ENDPOINTS.BITCOIN_NEWS_SENTIMENT);
  }, // ← note the comma here
};

export default apiService;
