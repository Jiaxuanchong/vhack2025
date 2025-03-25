import React, { useState } from 'react';
import { 
  TrendingUpIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  InformationCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentTextIcon
} from '@heroicons/react/outline';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";


// Enhanced bot performance data
const botPerformanceData = {
  totalBots: 12,
  cryptocurrencies: ['BTC', 'ETH', 'XRP', 'ADA', 'DOT', 'LINK', 'MATIC', 'SOL'],
  overallPerformance: {
    totalProfit: 124567.89,
    profitPercentage: 45.6,
    totalTrades: 8765,
    winRate: 72.5,
    sharpeRatio: 2.15,
    maxDrawdown: 9.8,
    totalVolume: 456.32,
    averageTradeDuration: '2h 15m'
  },
  profitTrend: [
    { month: 'Jan', profit: 50000 },
    { month: 'Feb', profit: 75000 },
    { month: 'Mar', profit: 124567 }
  ],
  assetAllocation: [
    { name: 'BTC', value: 40 },
    { name: 'ETH', value: 30 },
    { name: 'XRP', value: 15 },
    { name: 'Others', value: 15 }
  ],
  botDetails: [
    {
      name: 'Scalper Bot',
      status: 'Active',
      performance: {
        totalProfit: 32453.89,
        winRate: 75.2,
        profitFactor: 1.8,
        sharpeRatio: 1.55,
        maxDrawdown: 4.7,
        totalTrades: 2389,
        avgTradeProfit: 13.65
      },
      activeAssets: ['BTC/USDT', 'ETH/USDT', 'XRP/USDT'],
      currentPositions: [
        {
          asset: 'BTC/USDT',
          entryPrice: 42567.89,
          currentPrice: 43102.45,
          profitLoss: '+2.3%',
          volume: 0.75,
          entryTime: '2024-03-25 10:35:42'
        }
      ]
    },
    {
      name: 'Trend Follower Bot',
      status: 'Active',
      performance: {
        totalProfit: 45678.23,
        winRate: 68.9,
        profitFactor: 1.6,
        sharpeRatio: 1.35,
        maxDrawdown: 6.2,
        totalTrades: 3456,
        avgTradeProfit: 13.22
      },
      activeAssets: ['ETH/USDT', 'ADA/USDT', 'DOT/USDT'],
      currentPositions: [
        {
          asset: 'ETH/USDT',
          entryPrice: 2345.67,
          currentPrice: 2389.45,
          profitLoss: '+1.8%',
          volume: 1.25,
          entryTime: '2024-03-25 09:15:22'
        }
      ]
    },
    {
      name: 'Mean Reversion Bot',
      status: 'Stopped',
      performance: {
        totalProfit: 12345.67,
        winRate: 62.3,
        profitFactor: 1.4,
        sharpeRatio: 1.15,
        maxDrawdown: 8.5,
        totalTrades: 1876,
        avgTradeProfit: 6.58
      },
      activeAssets: ['XRP/USDT', 'LINK/USDT'],
      currentPositions: []
    }
  ],
  recentTrades: [
    {
      botName: 'Scalper Bot',
      asset: 'BTC/USDT',
      type: 'Long',
      entryPrice: 42567.89,
      exitPrice: 43102.45,
      profit: '+2.3%',
      tradeTime: '2024-03-25 10:35:42',
      status: 'Completed',
      aiAnalysis: {
        marketCondition: 'Bullish Momentum',
        technicalIndicators: ['RSI Oversold', 'MACD Crossover'],
        volumeProfile: 'High Trading Volume',
        riskAssessment: 'Low Risk Entry',
        predictiveScore: 0.85
      }
    },
    {
      botName: 'Trend Follower Bot',
      asset: 'ETH/USDT',
      type: 'Short',
      entryPrice: 2345.67,
      exitPrice: 2300.12,
      profit: '+1.9%',
      tradeTime: '2024-03-24 15:22:11',
      status: 'Completed',
      aiAnalysis: {
        marketCondition: 'Bearish Correction',
        technicalIndicators: ['RSI Overbought', 'Bollinger Band Squeeze'],
        volumeProfile: 'Moderate Trading Volume',
        riskAssessment: 'Medium Risk Entry',
        predictiveScore: 0.72
      }
    },
    {
      botName: 'Mean Reversion Bot',
      asset: 'XRP/USDT',
      type: 'Long',
      entryPrice: 0.45,
      exitPrice: 0.47,
      profit: '+4.2%',
      tradeTime: '2024-03-23 08:45:33',
      status: 'Completed',
      aiAnalysis: {
        marketCondition: 'Consolidation Phase',
        technicalIndicators: ['Support Level Test', 'Moving Average Convergence'],
        volumeProfile: 'Low Trading Volume',
        riskAssessment: 'Low Risk Entry',
        predictiveScore: 0.65
      }
    },
    {
      botName: 'Scalper Bot',
      asset: 'LINK/USDT',
      type: 'Short',
      entryPrice: 15.67,
      exitPrice: 15.32,
      profit: '+2.8%',
      tradeTime: '2024-03-22 12:10:55',
      status: 'Completed',
      aiAnalysis: {
        marketCondition: 'Bearish Trend',
        technicalIndicators: ['Resistance Level Rejection', 'Bearish Divergence'],
        volumeProfile: 'Moderate Trading Volume',
        riskAssessment: 'Medium Risk Entry',
        predictiveScore: 0.78
      }
    }
  ]
};

const TradingBotPortfolio = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Colors for the Pie Chart
  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A2"];

  const renderOverviewSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Overall Performance Summary */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <TrendingUpIcon className="h-6 w-6 text-green-400 mr-2" />
          <h3 className="text-xl font-semibold text-white">Total Profit & Cryptocurrencies</h3>
        </div>
        <div className="text-3xl font-bold text-green-400">
          ${botPerformanceData.overallPerformance.totalProfit.toLocaleString()}
        </div>
        <div className="text-sm text-gray-400 mb-4">
          +{botPerformanceData.overallPerformance.profitPercentage}% Overall
        </div>
        <div className="flex flex-wrap gap-2">
          {botPerformanceData.cryptocurrencies.map((crypto, index) => (
            <span key={index} className="bg-purple-500 text-white text-xs px-3 py-1 rounded">
              {crypto}
            </span>
          ))}
        </div>
      </div>

      {/* Performance Metrics Bar Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={[
            { name: "Total Trades", value: botPerformanceData.overallPerformance.totalTrades },
            { name: "Win Rate", value: botPerformanceData.overallPerformance.winRate },
            { name: "Sharpe Ratio", value: botPerformanceData.overallPerformance.sharpeRatio * 10 },
            { name: "Max Drawdown", value: botPerformanceData.overallPerformance.maxDrawdown }
          ]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            dataKey="name" 
            interval={0} 
            angle={-45} 
            textAnchor="end" 
            height={60} 
            fontSize={10}
          />
          <YAxis 
            label={{ 
              value: 'Value', 
              angle: -90, 
              position: 'insideLeft',
              offset: 0
            }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(255,255,255,0.0001)' }}
            formatter={(value, name) => [value, name]}
          />
          <Bar 
            dataKey="value" 
            fill="#8884d8" 
            barSize={40}
          >
            {/* Add individual colors to each bar */}
            {[
              "#FF6384",  // Reddish for Total Trades
              "#36A2EB",  // Blue for Win Rate
              "#FFCE56",  // Yellow for Sharpe Ratio
              "#4BC0C0"   // Teal for Max Drawdown
            ].map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>

      {/* Profit Trend Line Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Profit Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={botPerformanceData.profitTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="#00C49F" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cryptocurrency Allocation Pie Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Asset Allocation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={botPerformanceData.assetAllocation}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {botPerformanceData.assetAllocation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );


  const renderTradeHistorySection = () => (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Comprehensive Trade History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-2 text-left">Bot</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Asset</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Entry Price</th>
              <th className="p-2 text-left">Exit Price</th>
              <th className="p-2 text-left">Profit</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">AI Analysis</th>
            </tr>
          </thead>
          <tbody>
            {botPerformanceData.recentTrades.map((trade, index) => (
              <tr 
                key={index} 
                className={`
                  border-b border-gray-700 hover:bg-gray-700
                  ${trade.botName.includes('Stopped') ? 'opacity-50' : ''}
                `}
              >
                <td className="p-2 text-white">{trade.botName}</td>
                <td className="p-2">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${trade.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}
                  `}>
                    {trade.status}
                  </span>
                </td>
                <td className="p-2 text-blue-400">{trade.asset}</td>
                <td className="p-2">
                  <span className={`
                    ${trade.type === 'Long' ? 'text-green-400' : 'text-red-400'}
                    font-semibold
                  `}>
                    {trade.type}
                  </span>
                </td>
                <td className="p-2 text-white">${trade.entryPrice}</td>
                <td className="p-2 text-white">${trade.exitPrice}</td>
                <td className="p-2">
                  <span className={`
                    ${trade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}
                    font-semibold
                  `}>
                    {trade.profit}
                  </span>
                </td>
                <td className="p-2 text-gray-400">{trade.tradeTime}</td>
                <td className="p-2">
                  <details className="cursor-pointer">
                    <summary className="text-purple-400">View Details</summary>
                    <div className="bg-gray-900 p-2 rounded mt-2 text-xs">
                      <p><strong>Market Condition:</strong> {trade.aiAnalysis.marketCondition}</p>
                      <p><strong>Technical Indicators:</strong> {trade.aiAnalysis.technicalIndicators.join(', ')}</p>
                      <p><strong>Volume Profile:</strong> {trade.aiAnalysis.volumeProfile}</p>
                      <p><strong>Risk Assessment:</strong> {trade.aiAnalysis.riskAssessment}</p>
                      <p><strong>Predictive Score:</strong> {trade.aiAnalysis.predictiveScore}</p>
                    </div>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBotDetailsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {botPerformanceData.botDetails.map((bot, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">{bot.name}</h3>
            <span className={`
              px-2 py-1 rounded-full text-xs font-bold
              ${bot.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
            `}>
              {bot.status}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Profit</span>
              <span className="font-semibold text-green-400">
                ${bot.performance.totalProfit.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Win Rate</span>
              <span className="font-semibold text-green-400">
                {bot.performance.winRate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sharpe Ratio</span>
              <span className="text-white">
                {bot.performance.sharpeRatio}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Profit', value: bot.performance.totalProfit / 1000 },
                { name: 'Trades', value: bot.performance.totalTrades / 10 },
                { name: 'Win Rate', value: bot.performance.winRate },
                { name: 'Drawdown', value: bot.performance.maxDrawdown }
              ]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.0001)' }} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Active Assets</h4>
            <div className="flex space-x-2">
              {bot.activeAssets.map((asset, idx) => (
                <span 
                  key={idx} 
                  className="bg-purple-500 text-white text-xs px-2 py-1 rounded"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Current Positions</h4>
            {bot.currentPositions.length > 0 ? (
              bot.currentPositions.map((position, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-700 p-2 rounded mt-2"
                >
                  <div className="flex justify-between">
                    <span className="text-white">{position.asset}</span>
                    <span className={`
                      font-semibold
                      ${position.profitLoss.startsWith('+') ? 'text-green-400' : 'text-red-400'}
                    `}>
                      {position.profitLoss}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Volume: {position.volume} | Entry: ${position.entryPrice}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No active positions</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Trading Bot Portfolio
      </h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        {[
          { key: 'overview', label: 'Overview', icon: TrendingUpIcon },
          { key: 'trade-history', label: 'Trade History', icon: DocumentTextIcon },
          { key: 'bot-details', label: 'Bot Details', icon: ChartBarIcon }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg
              ${activeTab === tab.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
            `}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Content Rendering */}
      {activeTab === 'overview' && renderOverviewSection()}
      {activeTab === 'trade-history' && renderTradeHistorySection()}
      {activeTab === 'bot-details' && renderBotDetailsSection()}
    </div>
  );
};

export default TradingBotPortfolio;