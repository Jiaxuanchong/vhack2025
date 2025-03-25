import React, { useState, useEffect } from 'react';
import commentImg from "../assets/ss1.jpg";
function CommunityPage() {
  // Updated posts specifically for algo trading platform
  const posts = [
    {
        id: 1,
        title: 'Long-Term Trend Follower Bot Performance',
        author: 'Alex Rodrigues',
        location: 'Brazil',
        content: 'My Long-Term Trend Follower bot has been consistently delivering 12% annual returns by tracking moving averages across multiple cryptocurrency pairs. Key strategies include 50-day and 200-day moving average crossovers with strict risk management.',
        likes: 98,
        comments: 25,
        chartImage: true,
        role: '> 3 Years Experience'
    },
    {
        id: 2,
        title: 'Mean Reversion Strategy Insights',
        author: 'Emily Chen',
        location: 'Singapore',
        content: 'Developed a Mean Reversion bot that identifies short-term price fluctuations in top 10 cryptocurrencies. Backtesting shows promising results with lower drawdown compared to trend-following strategies.',
        likes: 76,
        comments: 18,
        chartImage: false,
        role: '0-1 Year Experience'
    },
    {
        id: 3,
        title: 'Arbitrage Trading Bot Success',
        author: 'Marcus Goldman',
        location: 'United States',
        content: 'My cross-exchange arbitrage bot has been capturing price differences between Binance and Kraken. Small but consistent profits with minimal risk exposure. Implemented sophisticated API management to reduce latency.',
        likes: 112,
        comments: 35,
        chartImage: false,
        role: '1-2 Years Experience'
    }
  ];

  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/bitcoin-news-sentiment")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.news_sentiment) {
          setNewsItems(data.news_sentiment);
        } else {
          console.error("No news_sentiment field in response:", data);
        }
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);
  
  // Custom scrollbar styles to be added to head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Scrollbar Styling */
      ::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(31, 41, 55, 0.5);
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.4);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.6);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Community Section */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Trading Bot Community</h2>
            
            {/* Chat Box */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full h-10 w-10 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-white text-sm font-bold">TC</span>
                </div>
                <input
                  type="text"
                  placeholder="Share your trading bot strategy..."
                  className="bg-gray-800 text-white rounded-lg flex-grow p-3 text-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  {[
                    { icon: 'emoji', path: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { icon: 'camera', path: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
                    { icon: 'list', path: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
                    { icon: 'attachment', path: 'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' }
                  ].map((item, index) => (
                    <button 
                      key={index} 
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={item.path} 
                        />
                      </svg>
                    </button>
                  ))}
                </div>
                
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300">
                  Share
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map(post => (
                <div 
                  key={post.id} 
                  className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-purple-600 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-full h-10 w-10 flex items-center justify-center mr-4 shadow-md">
                        <span className="text-white text-sm font-bold">TB</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{post.author}</p>
                        {post.location && <p className="text-xs text-gray-400">{post.location}</p>}
                      </div>
                    </div>
                    
                    <span className="bg-green-900/50 text-green-400 px-3 py-1 rounded-full text-xs">
                      {post.role}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white">{post.title}</h3>
                  {post.content && <p className="text-gray-300 mb-4">{post.content}</p>}
                  
                  {post.chartImage && (
                    <div className="bg-gray-800 rounded-lg p-2 mb-4 overflow-hidden">
                    <img 
                      src={commentImg}
                      alt="Performance Chart" 
                      className="w-full h-auto max-h-48 object-contain rounded-md 
                                 transform mx-auto block"
                    />
                  </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.comments}
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <button className="bg-gray-800 text-gray-400 rounded-full p-2 mr-2 hover:bg-purple-600 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      <span className="text-xs text-gray-400">Add Comment</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* News Section */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-white mb-6">Market News</h2>
            <div className="space-y-6">
              {newsItems.length > 0 ? (
                newsItems.map((results, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900 rounded-2xl p-5 shadow-lg border border-gray-800 hover:border-purple-600 transition-all duration-300"
                  >
                    <a href={results.link} target="_blank" rel="noopener noreferrer" className="block mb-4">
                      <img
                        src={results.image}
                        alt={results.title}
                        className="w-full h-48 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                      />
                    </a>

                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-white line-clamp-2">{results.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{results.description}</p>
                      <p className="text-xs text-gray-500">
                        {results.publisher} - {results.published_date}
                      </p>

                      <div className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap mt-2 ${
                        results.sentiment === "Positive"
                         ? "bg-green-900/50 text-green-400"
                         : results.sentiment === "Negative"
                         ? "bg-red-900/50 text-red-400"
                         : "bg-yellow-900/50 text-yellow-400"
                      }`}>
                        {results.sentiment} {results.impact_percentage}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Loading market news...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;