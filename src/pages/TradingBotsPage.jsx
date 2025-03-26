import React from 'react';
import {       // For Scalping Bot
  RefreshCw,         // For Swing Trading Bot
  TrendingUp,        // For Trend-Following & Momentum Trading Bots
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  DollarSign,        // For Dollar-Cost Averaging Bot
  Scale,             // For Leverage Trading Bot
  Repeat,            // For Futures, Martingale, AI Predictive Bots
  ArrowDownCircle,   // For Mean Reversion Bot
  Table,             // For Grid Trading Bot
  ShieldCheck,       // For HODL Strategy Bot
  Settings,          // For Portfolio Rebalancing Bot
  Beaker             // For Arbitrage Bot
} from 'lucide-react';

const userType = 'Aggressive Trader';
const recommendedStrategy = 'Scalping';

const botsData = [
  // Conservative Trader (Low-Risk, Long-Term Investors)
  {
    name: 'HODL Strategy Bot',
    description: 'Auto-buys Bitcoin at dips and holds for long-term gains.',
    icon: <ShieldCheck className="h-6 w-6 text-green-400" />,
    recommended: false,
    badge: 'Low Risk',
    stats: [
      { label: 'Win Rate', value: '65%' },
      { label: 'Monthly Return', value: '2%' },
      { label: 'Max Drawdown', value: '5%' },
      { label: 'Total Trades', value: '50' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.4",
      "Sharpe Ratio": "1.1",
      "Average Trade Duration": "1 month+",
      "Trade Frequency": "1-2 trades per week",
      "Required Capital": "$2,000 minimum",
      "Risk Management": "Minimal risk approach, no leverage",
      "Markets": "BTC, ETH, Blue-chip cryptos",
      "Strategy": "Focuses on buying dips in major cryptocurrencies and holding long-term.",
      "Performance": "Performs best in upward-trending markets with moderate volatility."
    }
  },
  {
    name: 'Dollar-Cost Averaging (DCA) Bot',
    description:
      'Invests a fixed amount at regular intervals to reduce market volatility risk.',
    icon: <DollarSign className="h-6 w-6 text-green-400" />,
    recommended: false,
    badge: 'Stable Investment',
    stats: [
      { label: 'Win Rate', value: '40%' },
      { label: 'Monthly Return', value: '3%' },
      { label: 'Max Drawdown', value: 'N/A' },
      { label: 'Total Trades', value: 'Auto-scheduled' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "N/A (gradual accumulation)",
      "Sharpe Ratio": "1.0",
      "Average Trade Duration": "N/A (regular intervals)",
      "Trade Frequency": "Weekly or monthly buys",
      "Required Capital": "Flexible, as low as $100 per interval",
      "Risk Management": "Spreads out purchases over time to minimize volatility",
      "Markets": "Major cryptocurrencies (BTC, ETH) or broad portfolios",
      "Strategy": "Consistently invests a set amount on a schedule to average out costs.",
      "Performance": "Ideal for long-term holders seeking to avoid timing the market."
    }
  },
  {
    name: 'Portfolio Rebalancing Bot',
    description:
      'Automatically adjusts asset allocations to maintain a stable risk profile.',
    icon: <Settings className="h-6 w-6 text-green-400" />,
    recommended: false,
    badge: 'Stable Income',
    stats: [
      { label: 'Win Rate', value: '50%' },
      { label: 'Monthly Return', value: 'Varies' },
      { label: 'Max Drawdown', value: 'Varies' },
      { label: 'Total Trades', value: 'Periodic rebalances' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.2",
      "Sharpe Ratio": "1.0",
      "Average Trade Duration": "Rebalance every 2 weeks",
      "Trade Frequency": "2 trades per month (rebalancing)",
      "Required Capital": "$3,000 minimum",
      "Risk Management": "Keeps portfolio allocations within target percentages",
      "Markets": "Mixed crypto portfolio (BTC, ETH, stablecoins, altcoins)",
      "Strategy": "Sells outperformers and buys underperformers to maintain risk balance.",
      "Performance": "Smooths out volatility over time, best for multi-coin portfolios."
    }
  },

  // Moderate Trader (Medium-Risk, Swing Traders)
  {
    name: 'Swing Trading Bot',
    description:
      'Detects trends and executes trades based on medium-term market movements.',
    icon: <RefreshCw className="h-6 w-6 text-yellow-400" />,
    recommended: false,
    badge: 'Balanced',
    stats: [
      { label: 'Win Rate', value: '60%' },
      { label: 'Monthly Return', value: '5%' },
      { label: 'Max Drawdown', value: '10%' },
      { label: 'Total Trades', value: '200' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.5",
      "Sharpe Ratio": "1.2",
      "Average Trade Duration": "3-7 days",
      "Trade Frequency": "2-3 trades per week",
      "Required Capital": "$5,000 minimum",
      "Risk Management": "Uses stop-losses based on ATR (Average True Range)",
      "Markets": "Major cryptocurrencies with clear trends",
      "Strategy": "Looks for short to medium-term swings in price momentum.",
      "Performance": "Works best in moderately trending or range-bound markets."
    }
  },
  {
    name: 'Trend-Following Bot',
    description:
      'Uses moving averages and indicators like MACD to follow strong trends.',
    icon: <TrendingUp className="h-6 w-6 text-yellow-400" />,
    recommended: false,
    badge: 'Medium Risk',
    stats: [
      { label: 'Win Rate', value: '55%' },
      { label: 'Monthly Return', value: '8%' },
      { label: 'Max Drawdown', value: '15%' },
      { label: 'Total Trades', value: '100' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.8",
      "Sharpe Ratio": "1.3",
      "Average Trade Duration": "1-2 weeks",
      "Trade Frequency": "4-6 trades per month",
      "Required Capital": "$6,000 minimum",
      "Risk Management": "Trailing stops to lock in profits",
      "Markets": "BTC, ETH, large-cap altcoins",
      "Strategy": "Follows the primary trend using moving average crossovers.",
      "Performance": "Excels in strongly trending bull or bear markets."
    }
  },
  {
    name: 'Mean Reversion Bot',
    description:
      'Buys assets when they are undervalued and sells when they are overvalued.',
    icon: <ArrowDownCircle className="h-6 w-6 text-yellow-400" />,
    recommended: false,
    badge: 'Statistical Approach',
    stats: [
      { label: 'Win Rate', value: '65%' },
      { label: 'Monthly Return', value: '4%' },
      { label: 'Max Drawdown', value: '8%' },
      { label: 'Total Trades', value: '300' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.4",
      "Sharpe Ratio": "1.1",
      "Average Trade Duration": "1-3 days",
      "Trade Frequency": "10-15 trades per week",
      "Required Capital": "$4,000 minimum",
      "Risk Management": "Tight stops when price deviates further than expected",
      "Markets": "High-volume cryptos, stable range altcoins",
      "Strategy": "Uses RSI, Bollinger Bands, or standard deviation channels.",
      "Performance": "Performs best in sideways or choppy markets."
    }
  },
  {
    name: 'Grid Trading Bot (Tighter Range)',
    description:
      'Places automated buy/sell orders within a defined price range for profit in sideways markets.',
    icon: <Table className="h-6 w-6 text-yellow-400" />,
    recommended: false,
    badge: 'Sideways Market',
    stats: [
      { label: 'Win Rate', value: '68%' },
      { label: 'Monthly Return', value: '3%' },
      { label: 'Max Drawdown', value: '5%' },
      { label: 'Total Trades', value: '500' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.3",
      "Sharpe Ratio": "1.0",
      "Average Trade Duration": "4-12 hours",
      "Trade Frequency": "20-40 trades per week",
      "Required Capital": "$3,000 minimum",
      "Risk Management": "Evenly distributes orders across grid levels",
      "Markets": "Stablecoins and major crypto pairs with low volatility",
      "Strategy": "Captures small profits repeatedly as price oscillates within a range.",
      "Performance": "Ideal for flat or slightly ranging market conditions."
    }
  },

  // Aggressive Trader (High Risk, High Reward)
  {
    name: 'Scalping Bot',
    description:
      'Uses high-frequency trading (HFT) to capture small price movements multiple times per day.',
    icon: <Scale className="h-6 w-6 text-red-500" />,
    recommended: userType === 'Aggressive Trader',
    badge: 'High Risk, High Reward',
    stats: [
      { label: 'Win Rate', value: '72%' },
      { label: 'Monthly Return', value: '10%' },
      { label: 'Max Drawdown', value: '12%' },
      { label: 'Total Trades', value: '1200' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.6",
      "Sharpe Ratio": "1.2",
      "Average Trade Duration": "2-5 minutes",
      "Trade Frequency": "20-30 trades per day",
      "Required Capital": "$3,000 minimum",
      "Risk Management": "Stop-loss at 0.5% per trade",
      "Markets": "BTC, ETH, high-volume altcoins",
      "Strategy": "High-frequency trades to exploit minor intraday price moves.",
      "Performance": "Requires quick execution; thrives in volatile, liquid markets."
    }
  },
  {
    name: 'Arbitrage Bot',
    description:
      'Exploits price differences between exchanges to generate profits.',
    icon: <Beaker className="h-6 w-6 text-red-500" />,
    recommended: userType === 'Aggressive Trader',
    badge: 'High Risk',
    stats: [
      { label: 'Win Rate', value: '80%' },
      { label: 'Monthly Return', value: '5%' },
      { label: 'Max Drawdown', value: '3%' },
      { label: 'Total Trades', value: '600' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.9",
      "Sharpe Ratio": "1.4",
      "Average Trade Duration": "1-15 minutes",
      "Trade Frequency": "10-20 trades per day",
      "Required Capital": "$5,000 minimum",
      "Risk Management": "Rapid execution to avoid exposure risk",
      "Markets": "Multiple crypto exchanges with price discrepancies",
      "Strategy": "Simultaneously buys low on one exchange and sells high on another.",
      "Performance": "Market-neutral approach but requires consistent liquidity."
    }
  },
  {
    name: 'Momentum Trading Bot',
    description:
      'Uses RSI and volume indicators to capitalize on strong price movements.',
    icon: <TrendingUp className="h-6 w-6 text-red-500" />,
    recommended: userType === 'Aggressive Trader',
    badge: 'High Volatility',
    stats: [
      { label: 'Win Rate', value: '66%' },
      { label: 'Monthly Return', value: '9%' },
      { label: 'Max Drawdown', value: '15%' },
      { label: 'Total Trades', value: '400' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.7",
      "Sharpe Ratio": "1.2",
      "Average Trade Duration": "4-8 hours",
      "Trade Frequency": "5-10 trades per week",
      "Required Capital": "$4,000 minimum",
      "Risk Management": "Stops at key support/resistance levels",
      "Markets": "Volatile altcoins, BTC, ETH in strong moves",
      "Strategy": "Buys breakouts confirmed by volume spikes and RSI momentum.",
      "Performance": "Excels in short, explosive market runs with high volatility."
    }
  },

  // High-Risk Trader (Extreme Risk, Leveraged Trading)
  {
    name: 'Leverage Trading Bot',
    description:
      'Uses margin trading to amplify gains (and risks).',
    icon: <Scale className="h-6 w-6 text-blue-500" />,
    recommended: false,
    badge: 'Extreme Risk',
    stats: [
      { label: 'Win Rate', value: '58%' },
      { label: 'Monthly Return', value: '12%' },
      { label: 'Max Drawdown', value: '25%' },
      { label: 'Total Trades', value: '300' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.5",
      "Sharpe Ratio": "1.0",
      "Average Trade Duration": "1-2 days",
      "Trade Frequency": "5-8 trades per week",
      "Required Capital": "$5,000 minimum",
      "Risk Management": "Leverage up to 5x with strict stop-losses",
      "Markets": "BTC, ETH, top altcoins on margin-enabled exchanges",
      "Strategy": "Amplifies returns with margin but also increases drawdowns.",
      "Performance": "High potential gains but significant risk in volatile markets."
    }
  },
  {
    name: 'Futures Trading Bot',
    description:
      'Trades Bitcoin futures contracts with long/short strategies.',
    icon: <Repeat className="h-6 w-6 text-blue-500" />,
    recommended: false,
    badge: 'Leverage Trading',
    stats: [
      { label: 'Win Rate', value: '62%' },
      { label: 'Monthly Return', value: '10%' },
      { label: 'Max Drawdown', value: '20%' },
      { label: 'Total Trades', value: '250' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.6",
      "Sharpe Ratio": "1.1",
      "Average Trade Duration": "12-48 hours",
      "Trade Frequency": "4-6 trades per week",
      "Required Capital": "$7,000 minimum",
      "Risk Management": "Tight stops with hedging possible",
      "Markets": "Bitcoin futures (USD-M, Coin-M), sometimes ETH futures",
      "Strategy": "Goes long or short based on technical signals, uses leverage up to 3x.",
      "Performance": "Beneficial in trending markets, higher risk in choppy conditions."
    }
  },
  {
    name: 'Martingale Bot',
    description:
      'Doubles trade size after each loss to recover losses quickly (very risky).',
    icon: <Repeat className="h-6 w-6 text-blue-500" />,
    recommended: false,
    badge: 'High-Risk Strategy',
    stats: [
      { label: 'Win Rate', value: '—' },
      { label: 'Monthly Return', value: 'Varies' },
      { label: 'Max Drawdown', value: 'Potentially 100%' },
      { label: 'Total Trades', value: '—' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "N/A",
      "Sharpe Ratio": "N/A",
      "Average Trade Duration": "Varies widely",
      "Trade Frequency": "As triggered by losses",
      "Required Capital": "$10,000 minimum (very high risk)",
      "Risk Management": "Little to none, doubling position on each loss",
      "Markets": "Margin-enabled cryptos with decent liquidity",
      "Strategy": "Attempts to recover losses by increasing position size exponentially.",
      "Performance": "Potentially catastrophic drawdowns if losses streak."
    }
  },
  {
    name: 'AI Predictive Trading Bot',
    description:
      'Uses machine learning to forecast market trends and trade aggressively.',
    icon: <Repeat className="h-6 w-6 text-blue-500" />,
    recommended: false,
    badge: 'AI-Based Trading',
    stats: [
      { label: 'Win Rate', value: '65%' },
      { label: 'Monthly Return', value: '15%' },
      { label: 'Max Drawdown', value: '18%' },
      { label: 'Total Trades', value: '350' }
    ],
    details: {
      "Backtest Period": "Feb 2023 - Aug 2023",
      "Profit Factor": "1.9",
      "Sharpe Ratio": "1.3",
      "Average Trade Duration": "8-24 hours",
      "Trade Frequency": "8-12 trades per week",
      "Required Capital": "$6,000 minimum",
      "Risk Management": "Adaptive stop-loss based on predictive confidence",
      "Markets": "Top cryptos with sufficient data (BTC, ETH, BNB, etc.)",
      "Strategy": "Neural network or ML models predict short-term price direction.",
      "Performance": "Can outperform in volatile markets if models are well-tuned."
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
        Discover our high-performance crypto trading bots with verified backtest results.
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
                bot.name === 'Scalping Bot' && (
                  <span className="ml-auto bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                    Recommended
                  </span>
                )}
            </div>

            {/* Bot Description */}
            <p className="text-sm text-gray-300 mb-3">{bot.description}</p>
            <span className="text-xs text-gray-400 italic mb-4">{bot.badge}</span>

            {/* Quick Stats */}
            <div className="bg-black/30 rounded-lg p-3 mb-2">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">
                Backtest Results:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {bot.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between">
                    <span className="text-xs text-gray-400">{stat.label}:</span>
                    <span className="text-sm font-medium text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Information - Scrollable */}
            <div className="bg-black/20 rounded-lg p-3 text-xs text-gray-300 overflow-y-auto h-32 mt-2 mb-2">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">
                Detailed Analysis:
              </h3>
              {Object.entries(bot.details).map(([key, value]) => (
                <div key={key} className="mb-2 last:mb-0">
                  <span className="font-medium text-purple-200">{key}:</span> {value}
                </div>
              ))}
            </div>

            {/* Deploy Button */}
            <button className="mt-auto bg-purple-600 hover:bg-purple-500 transition-colors text-white py-2 px-4 rounded-md font-semibold">
              Deploy Bot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradingBotsPage;
