import React from 'react';
// If using Heroicons v2, adjust import to '@heroicons/react/24/outline'
import {
  LightningBoltIcon,
  RefreshIcon,
  TrendingUpIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  BeakerIcon,
  UserGroupIcon,
  ThumbUpIcon,
  StarIcon
} from '@heroicons/react/outline';

// For demonstration, we'll assume the user is an Aggressive Trader 
// with recommended strategy "Scalping".
const userType = 'Aggressive Trader';
const recommendedStrategy = 'Scalping';

const botsData = [
  {
    name: 'Scalper Bot',
    icon: <LightningBoltIcon className="h-6 w-6 text-purple-300" />,
    description: 'Quick, frequent trades with small profits',
    stats: [
      { label: 'Win Rate', value: '73%' },
      { label: 'Monthly Return', value: '3.5%' },
      { label: 'Max Drawdown', value: '5%' },
      { label: 'Total Trades', value: '1,200' }
    ],
    users: 8642,
    likes: 4328,
    rating: 4.8,
    bestFor: 'Best for: Highly liquid markets with tight spreads',
    details: {
      "Backtest Period": "Jan 2022 - Dec 2022",
      "Profit Factor": "1.6",
      "Sharpe Ratio": "1.25",
      "Average Trade Duration": "3.5 minutes",
      "Trade Frequency": "15-20 trades per day",
      "Required Capital": "$5,000 minimum",
      "Risk Management": "Auto stop-loss at 0.5% per trade",
      "Markets": "Forex, Crypto, High-volume stocks",
      "Strategy": "Uses price action and volume analysis to capture small market inefficiencies with high frequency",
      "Performance": "Consistently profitable in both bull and bear markets with minimal correlation to overall market direction"
    }
  },
  {
    name: 'Day Trader Bot',
    icon: <ChartBarIcon className="h-6 w-6 text-purple-300" />,
    description: 'Intraday trades avoiding overnight exposure',
    stats: [
      { label: 'Win Rate', value: '68%' },
      { label: 'Monthly Return', value: '4.2%' },
      { label: 'Max Drawdown', value: '6%' },
      { label: 'Total Trades', value: '850' }
    ],
    users: 7516,
    likes: 3892,
    rating: 4.6,
    bestFor: 'Best for: Active traders seeking daily profits',
    details: {
      "Backtest Period": "Mar 2022 - Feb 2023",
      "Profit Factor": "1.4",
      "Sharpe Ratio": "1.10",
      "Average Trade Duration": "2-4 hours",
      "Trade Frequency": "3-5 trades per day",
      "Required Capital": "$10,000 minimum",
      "Risk Management": "1% risk per trade with trailing stops",
      "Markets": "US Equities, ETFs, Commodities",
      "Strategy": "Monitors market open patterns and intraday momentum using multiple technical indicators for optimal entry and exit",
      "Performance": "Outperforms in volatile markets with clear intraday trends and high trading volume"
    }
  },
  {
    name: 'Swing Trader Bot',
    icon: <RefreshIcon className="h-6 w-6 text-purple-300" />,
    description: 'Medium-term positions over days/weeks',
    stats: [
      { label: 'Win Rate', value: '65%' },
      { label: 'Monthly Return', value: '5.1%' },
      { label: 'Max Drawdown', value: '8%' },
      { label: 'Total Trades', value: '450' }
    ],
    users: 6290,
    likes: 3451,
    rating: 4.7,
    bestFor: 'Best for: Capturing larger market swings',
    details: {
      "Backtest Period": "Jan 2021 - Dec 2021",
      "Profit Factor": "1.7",
      "Sharpe Ratio": "1.35",
      "Average Trade Duration": "5-12 days",
      "Trade Frequency": "2-3 trades per week",
      "Required Capital": "$15,000 minimum",
      "Risk Management": "2% max risk per position with multiple take-profit levels",
      "Markets": "Forex, Stock Indices, Large-cap stocks",
      "Strategy": "Combines trend analysis with support/resistance levels to identify reversals and continuation patterns",
      "Performance": "Historical data shows 85% correlation with major market trends with reduced volatility compared to buy-and-hold"
    }
  },
  {
    name: 'Trend Follower Bot',
    icon: <TrendingUpIcon className="h-6 w-6 text-purple-300" />,
    description: 'Rides major market trends for larger gains',
    stats: [
      { label: 'Win Rate', value: '62%' },
      { label: 'Monthly Return', value: '6.0%' },
      { label: 'Max Drawdown', value: '10%' },
      { label: 'Total Trades', value: '300' }
    ],
    users: 5845,
    likes: 3216,
    rating: 4.5,
    bestFor: 'Best for: Strong trending markets with clear direction',
    details: {
      "Backtest Period": "Jun 2021 - Jun 2022",
      "Profit Factor": "1.9",
      "Sharpe Ratio": "1.50",
      "Average Trade Duration": "15-45 days",
      "Trade Frequency": "3-6 trades per month",
      "Required Capital": "$25,000 minimum",
      "Risk Management": "Pyramiding strategy with position sizing based on volatility",
      "Markets": "Global indices, Commodities, Forex majors",
      "Strategy": "Uses multiple timeframe analysis with moving averages and breakout confirmation to enter strong trends early",
      "Performance": "Significantly outperforms in directional markets with 92% of profits coming from just 20% of trades"
    }
  },
  {
    name: 'Mean Reversion Bot',
    icon: <CogIcon className="h-6 w-6 text-purple-300" />,
    description: 'Trades on price returns to average values',
    stats: [
      { label: 'Win Rate', value: '70%' },
      { label: 'Monthly Return', value: '2.8%' },
      { label: 'Max Drawdown', value: '4%' },
      { label: 'Total Trades', value: '950' }
    ],
    users: 4732,
    likes: 2594,
    rating: 4.4,
    bestFor: 'Best for: Range-bound markets with high volatility',
    details: {
      "Backtest Period": "Feb 2021 - Jan 2022",
      "Profit Factor": "1.3",
      "Sharpe Ratio": "1.05",
      "Average Trade Duration": "1-3 days",
      "Trade Frequency": "10-15 trades per week",
      "Required Capital": "$8,000 minimum",
      "Risk Management": "Equal position sizing with tight stops at extremes",
      "Markets": "ETFs, Index options, Liquid blue-chip stocks",
      "Strategy": "Identifies statistical deviations using Bollinger Bands, RSI, and standard deviation to enter when prices reach extreme values",
      "Performance": "Most consistent performance during sideways markets and reduced profits during strong trends"
    }
  },
  {
    name: 'Grid Bot',
    icon: <ShieldCheckIcon className="h-6 w-6 text-purple-300" />,
    description: 'Profits from volatility with grid orders',
    stats: [
      { label: 'Win Rate', value: '66%' },
      { label: 'Monthly Return', value: '3.2%' },
      { label: 'Max Drawdown', value: '7%' },
      { label: 'Total Trades', value: '1,100' }
    ],
    users: 5127,
    likes: 2783,
    rating: 4.3,
    bestFor: 'Best for: Sideways markets with defined ranges',
    details: {
      "Backtest Period": "May 2021 - Apr 2022",
      "Profit Factor": "1.5",
      "Sharpe Ratio": "1.20",
      "Average Trade Duration": "5-24 hours",
      "Trade Frequency": "20-40 trades per week",
      "Required Capital": "$7,500 minimum",
      "Risk Management": "Distributed risk across multiple grid levels",
      "Markets": "Cryptocurrency pairs, Forex, Range-bound commodities",
      "Strategy": "Creates a grid of buy and sell orders at predetermined intervals to profit from price oscillations within a range",
      "Performance": "Shows 76% win rate during flat markets and automatically adjusts grid spacing based on recent volatility"
    }
  },
  {
    name: 'Arbitrage Bot',
    icon: <CurrencyDollarIcon className="h-6 w-6 text-purple-300" />,
    description: 'Exploits price differences across markets',
    stats: [
      { label: 'Win Rate', value: '80%' },
      { label: 'Monthly Return', value: '1.8%' },
      { label: 'Max Drawdown', value: '3%' },
      { label: 'Total Trades', value: '600' }
    ],
    users: 3964,
    likes: 2347,
    rating: 4.2,
    bestFor: 'Best for: Low-risk traders seeking consistent returns',
    details: {
      "Backtest Period": "Jul 2021 - Jul 2022",
      "Profit Factor": "2.0",
      "Sharpe Ratio": "1.80",
      "Average Trade Duration": "1-30 minutes",
      "Trade Frequency": "15-50 trades per day",
      "Required Capital": "$20,000 minimum",
      "Risk Management": "Low exposure with high-frequency execution",
      "Markets": "Cross-exchange crypto, Forex pairs, Exchange-traded derivatives",
      "Strategy": "Monitors price discrepancies between different markets and executes simultaneous trades to capture risk-free spreads",
      "Performance": "Nearly market-neutral with consistent returns regardless of overall market direction"
    }
  },
  {
    name: 'Options Bot',
    icon: <ChartPieIcon className="h-6 w-6 text-purple-300" />,
    description: 'Leverages options for strategic positions',
    stats: [
      { label: 'Win Rate', value: '58%' },
      { label: 'Monthly Return', value: '4.5%' },
      { label: 'Max Drawdown', value: '9%' },
      { label: 'Total Trades', value: '400' }
    ],
    users: 3218,
    likes: 1876,
    rating: 4.1,
    bestFor: 'Best for: Advanced traders with options experience',
    details: {
      "Backtest Period": "Sep 2021 - Aug 2022",
      "Profit Factor": "1.6",
      "Sharpe Ratio": "1.15",
      "Average Trade Duration": "3-15 days",
      "Trade Frequency": "5-10 trades per week",
      "Required Capital": "$30,000 minimum",
      "Risk Management": "Defined-risk strategies with position sizing based on implied volatility",
      "Markets": "US options markets, Index options, ETF options",
      "Strategy": "Employs various options strategies including iron condors, butterflies, and vertical spreads based on volatility forecasting",
      "Performance": "Outperforms during high volatility with reduced correlation to market direction"
    }
  },
  {
    name: 'Futures Bot',
    icon: <BeakerIcon className="h-6 w-6 text-purple-300" />,
    description: 'Trades futures with hedging strategies',
    stats: [
      { label: 'Win Rate', value: '63%' },
      { label: 'Monthly Return', value: '3.9%' },
      { label: 'Max Drawdown', value: '8%' },
      { label: 'Total Trades', value: '500' }
    ],
    users: 4125,
    likes: 2268,
    rating: 4.4,
    bestFor: 'Best for: Capturing volatility in futures markets',
    details: {
      "Backtest Period": "Oct 2021 - Sep 2022",
      "Profit Factor": "1.5",
      "Sharpe Ratio": "1.30",
      "Average Trade Duration": "1-5 days",
      "Trade Frequency": "10-15 trades per week",
      "Required Capital": "$25,000 minimum",
      "Risk Management": "Leveraged positions with strict stop-loss and hedging rules",
      "Markets": "E-mini futures, Commodity futures, Treasury futures",
      "Strategy": "Uses breakout patterns and momentum indicators with correlated asset hedging to manage risk during volatile periods",
      "Performance": "Shows 72% positive months with strong performance during major market events and economic announcements"
    }
  }
];

const TradingBotsPage = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white py-8 px-4 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-4 text-center">
        Automated Trading Bots
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mb-10">
        Discover our high-performance trading bots with verified backtest results.
        <span className="ml-2 text-yellow-400 font-bold">
          {userType === 'Aggressive Trader' && 'Recommended for aggressive traders!'}
        </span>
      </p>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {botsData.map((bot) => (
          <div
            key={bot.name}
            className="bg-white/10 backdrop-blur-sm border border-purple-500 rounded-lg p-4 flex flex-col hover:shadow-xl hover:border-purple-400 transition-all duration-300"
          >
            {/* Header Section */}
            <div className="flex items-center space-x-2 mb-3">
              {bot.icon}
              <h2 className="text-xl font-semibold">{bot.name}</h2>
              {userType === 'Aggressive Trader' &&
                recommendedStrategy === 'Scalping' &&
                bot.name === 'Scalper Bot' && (
                  <span className="ml-auto bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                    Recommended
                  </span>
                )}
            </div>
            <p className="text-sm text-gray-300 mb-3">{bot.description}</p>

            {/* User Stats */}
            <div className="flex items-center space-x-4 mb-3 text-xs text-gray-400">
              <div className="flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-1 text-purple-300" />
                <span>{bot.users.toLocaleString()} users</span>
              </div>
              <div className="flex items-center">
                <ThumbUpIcon className="h-4 w-4 mr-1 text-purple-300" />
                <span>{bot.likes.toLocaleString()} likes</span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(bot.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
                <span className="ml-1">{bot.rating}</span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-black/30 rounded-lg p-3 mb-2">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">Backtest Results:</h3>
              <div className="grid grid-cols-2 gap-2">
                {bot.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between">
                    <span className="text-xs text-gray-400">{stat.label}:</span>
                    <span className="text-sm font-medium text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Detailed Information - Scrollable */}
            <div className="bg-black/20 rounded-lg p-3 text-xs text-gray-300 overflow-y-auto h-32 mt-2 mb-2">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">Detailed Analysis:</h3>
              {Object.entries(bot.details).map(([key, value]) => (
                <div key={key} className="mb-2 last:mb-0">
                  <span className="font-medium text-purple-200">{key}:</span> {value}
                </div>
              ))}
            </div>
            
            {/* Best For */}
            <p className="text-xs text-gray-400 italic mb-3">{bot.bestFor}</p>

            {/* Call-to-Action Button */}
            <button className="mt-auto bg-purple-600 hover:bg-purple-500 transition-colors text-white py-2 px-4 rounded-md font-semibold">
              Deploy Bot
            </button>
          </div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(100, 100, 100, 0.2);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(138, 75, 175, 0.5);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(138, 75, 175, 0.8);
        }
        
        /* For Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(138, 75, 175, 0.5) rgba(100, 100, 100, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TradingBotsPage;