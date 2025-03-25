import React, { useRef, useState, useEffect } from 'react';
import {
  LightningBoltIcon,
  ClockIcon,
  RefreshIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const SurveyResultPage = () => {
  const [traderType] = useState('Aggressive Trader');
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollRef = useRef(null);

  const traderDescriptions = {
    'Conservative Trader':
      'As a Conservative Trader, you focus on stable, long-term growth, prioritize capital preservation, and generally have a lower risk tolerance.',
    'Moderate Trader':
      'As a Moderate Trader, you seek a balance between risk and reward, combining both short-term and long-term strategies.',
    'Aggressive Trader':
      'As an Aggressive Trader, you have a higher risk tolerance and look for short-term, high-potential opportunities.'
  };

  const strategyOptions = [
    {
      name: 'Scalping',
      description:
        'Quick, small trades aimed at capitalizing on minute market movements.',
      icon: <LightningBoltIcon className="h-6 w-6 text-purple-300" />,
      recommended: traderType === 'Aggressive Trader',
      badge: 'High Risk, High Reward'
    },
    {
      name: 'Day Trading',
      description:
        'Positions opened and closed within the same day, avoiding overnight risk.',
      icon: <ClockIcon className="h-6 w-6 text-purple-300" />,
      recommended: false,
      badge: 'Medium Risk'
    },
    {
      name: 'Swing Trading',
      description:
        'Capturing medium-term price moves over a few days to weeks.',
      icon: <RefreshIcon className="h-6 w-6 text-purple-300" />,
      recommended: false,
      badge: 'Balanced'
    },
    {
      name: 'Position Trading',
      description:
        'Long-term approach focusing on major trends and fundamental analysis.',
      icon: <TrendingUpIcon className="h-6 w-6 text-purple-300" />,
      recommended: false,
      badge: 'Lower Risk'
    }
  ];

  // Check if scroll is needed
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -250,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    }
  };

  const handleStrategyChange = (strategyName) => {
    setSelectedStrategy(strategyName);
  };

  const navigate = useNavigate();

  const handleConfirmSelection = () => {
  if (!selectedStrategy) {
    alert('Please select a strategy before proceeding.');
    return;
  }
  // Navigate to the Trading Bots page after confirming
  navigate('/trading-bots');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-black to-gray-900 text-white py-8 px-4">
      {/* Header with Logo Placeholder */}
      
      {/* Content Container */}
      <div className="w-full max-w-5xl flex flex-col items-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-purple-500/30">
        {/* Result Heading */}
        <div className="relative mb-6 text-center">
          
          <h2 className="text-2xl font-light text-center text-gray-300">
            Hey there, we've analyzed your responses! You are an
          </h2>

          {/* Trader Type Badge */}
          <div className="mt-3 mb-2 flex justify-center">
            <span className="inline-block border-2 border-yellow-400 bg-yellow-400/10 text-yellow-400 px-6 py-2 rounded-full font-bold text-2xl shadow-lg shadow-yellow-400/20">
              {traderType}
            </span>
          </div>
        </div>

        {/* Trader Description */}
        <p className="mb-4 text-center max-w-3xl text-gray-200 text-md">
          {traderDescriptions[traderType] || ''}
        </p>

        {/* Strategy Selection Header */}
        <h3 className="text-xl font-semibold mb-2 text-purple-300">Recommended Trading Strategies</h3>

        {/* Horizontal Scroll with left/right arrows */}
        <div className="relative w-full mb-6">
          {/* Left Arrow - only show if scrollable */}
          {isScrollable && (
            <button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 -translate-y-1/2 
                bg-black/50 text-yellow-400 p-2 rounded-full 
                hover:bg-yellow-400/20 transition-colors z-10 shadow-lg"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {/* Scroll Container with custom scrollbar */}
          <div
            className="mx-4 flex space-x-6 overflow-x-auto py-6 px-2 scrollbar-hide"
            ref={scrollRef}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {strategyOptions.map((option) => {
              const isSelected = selectedStrategy === option.name;
              
              return (
                <div
                  key={option.name}
                  className={`flex-none w-72 bg-black/40 backdrop-blur-sm 
                    rounded-xl p-5 cursor-pointer transform transition-all duration-300
                    hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
                    ${isSelected ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/30 scale-105' : 'border border-purple-500/20'}
                  `}
                  onClick={() => handleStrategyChange(option.name)}
                >
                  {/* Badge */}
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50">
                      {option.badge}
                    </span>
                  </div>
                  
                  {/* Icon + Name */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-purple-900/30 rounded-lg">
                      {option.icon}
                    </div>
                    <h4 className="text-xl font-bold">{option.name}</h4>
                    {isSelected && (
                      <CheckCircleIcon className="h-5 w-5 text-green-400 ml-auto" />
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300">{option.description}</p>

                  {/* Recommendation */}
                  {option.recommended && (
                    <div className="mt-4 flex items-center space-x-2 text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-semibold">Recommended for your profile!</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Arrow - only show if scrollable */}
          {isScrollable && (
            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 -translate-y-1/2 
                bg-black/50 text-yellow-400 p-2 rounded-full 
                hover:bg-yellow-400/20 transition-colors z-10 shadow-lg"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Scroll Indicator Dots */}
        {isScrollable && (
          <div className="flex space-x-2 justify-center mb-6">
            {strategyOptions.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-purple-500' : 'bg-purple-900'}`}
              />
            ))}
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirmSelection}
          disabled={!selectedStrategy}
          className={`mt-4 py-3 px-10 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg
            ${selectedStrategy 
              ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-purple-500/30' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          {selectedStrategy ? 'Confirm Your Selection' : 'Select a Strategy'}
        </button>

        {/* Alert Section */}
        <div className="mt-10 bg-red-900/20 border border-red-500/30 rounded-lg p-4 max-w-5xl">
          <div className="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong className="text-red-500 font-bold text-sm">Risk Alert!</strong>
              <p className="text-gray-300 mt-1 text-xs">
                Based on your assets, risk tolerance, occupation, and behavior analysis, 
                our experts recommend exploring our aggressive trading bot for optimal results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResultPage;