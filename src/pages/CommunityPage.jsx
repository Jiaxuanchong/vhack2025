import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

function CommunityPage() {
  // Fake data for posts
  const posts = [
    {
        id: 1,
        title: 'Front-end Development',
        author: 'Abu Bakar',
        location: 'Malaysia',
        content: 'The three main languages you need to know well are HTML, CSS, and JavaScript...',
        likes: 98,
        comments: 25,
        chartImage: true
    },
    {
        id: 2,
        title: 'Front-end Development And Backend Developer',
        author: 'William Chua',
        location: 'United Kingdom',
        content: '',
        likes: 0,
        comments: 0,
        chartImage: false
    },
    {
        id: 3,
        title: 'Front-end Development',
        author: 'Anderson',
        location: 'Mexico',
        content: 'The three main languages you need to know well are HTML, CSS, and JavaScript...',
        likes: 12,
        comments: 3,
        chartImage: true
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
        width: 14px;
        background-color: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.3);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.5);
      }
      
      /* Hide scrollbar for Firefox */
      * {
        scrollbar-width: medium;
        scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex-grow flex flex-col h-screen w-full overflow-hidden">
    <div className="flex h-screen w-full bg-black text-white">
        <div className="flex-1 min-h-3 flex p-4">
          {/* Community Section */}
          <div className="flex-grow max-w-4xl mr-3 ml-12 h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Community</h2>
            <div className="flex-1 overflow-y-auto pb-12">
            {/* Chat Box */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  <span className="text-white text-xs">SC</span>
                </div>
                <input
                  type="text"
                  placeholder="What's on your mind ?"
                  className="bg-gray-700 rounded-lg flex-grow p-2 text-sm"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </button>
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                </div>
                
                <button className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm">
                  Post
                </button>
              </div>
            </div>
            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-pink-500 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                      <span className="text-white text-xs">EA</span>
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      {post.location && <p className="text-xs text-gray-400">{post.location}</p>}
                    </div>
                  </div>
                  
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs">
                    Front-end
                  </button>
                </div>
                
                <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                {post.content && <p className="text-sm mb-4">{post.content}</p>}
                
                {post.chartImage && (
                  <div className="bg-white rounded-lg p-2 mb-4">
                    <img 
                      src="https://via.placeholder.com/500x200?text=Chart+Data" 
                      alt="Chart Data" 
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center text-gray-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button className="flex items-center text-gray-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <button className="bg-gray-700 text-gray-400 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-400">Add Response</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          
          {/* News Section */}
          <div className="w-80 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-white">More News</h2>
          <div className="flex-1 overflow-y-auto pb-4 pr-2">
            {newsItems.length > 0 ? (
              newsItems.map((results, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md items-start space-x-4 mb-4">
                  {/* Image */}
                  <a href={results.link} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={results.image}
                    alt={results.title}
                    className="p-2 rounded-lg cursor-pointer"
                  />
                </a>


                  {/* Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h4 className="text-sm font-bold text-gray-900">{results.title}</h4>

                    {/* Description */}
                    <p className="text-xs text-gray-500 line-clamp-2">{results.description}</p>

                    {/* Publisher & Date */}
                    <p className="text-xs text-gray-400 mt-1">
                      {results.publisher} - {results.published_date}
                    </p>
                  </div>

                  {/* Impact Percentage Badge */}
                  <div className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                    results.sentiment === "Positive"
                     ? "bg-green-100 text-green-800"
                     : results.sentiment === "Negative"
                     ? "bg-red-100 text-red-800"
                     : "bg-yellow-100 text-yellow-700"
                  }`}>
                 {results.sentiment} {results.impact_percentage}%
                </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400">Loading news...</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CommunityPage;