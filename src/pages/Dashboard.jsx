import React, { useState } from "react";
import { Bell, Search } from "lucide-react";
import TradingChart from "./CandleStickChart"; // <-- Your candlestick/line chart component

const Dashboard = () => {
  const [price] = useState(19972.9);
  const [amount, setAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [selectedTradeType, setSelectedTradeType] = useState("Spot");
  const [selectedOrderType, setSelectedOrderType] = useState("Limit");
  const [activeTradingBot, setActiveTradingBot] = useState(null);

  const handleBotSelection = (botType) => {
    setActiveTradingBot(botType);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header / Navbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-purple-500 rounded mr-2" />
            <span className="font-bold text-lg">SwiftTrade</span>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex space-x-6">
          {["Dashboard", "News", "Community", "Support", "Portfolio"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                selectedTab === tab ? "border-b-2 border-purple-500" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Left Sidebar | Center | Right Sidebar */}
      <div className="flex flex-1">
        {/* Left Sidebar - Chatbot */}
        <div className="w-52 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <p className="text-lg">Chatbot</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-400">
              <div className="h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <span>🤖</span>
              </div>
              <p className="text-center text-sm">Type your questions here...</p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-700">
            <button className="w-full py-2 bg-gray-700 rounded text-center">Guide</button>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center bg-gray-800 rounded-md px-4 py-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="SEARCH TRADERS"
                className="bg-transparent border-none focus:outline-none text-gray-300 w-full"
              />
            </div>
          </div>

          {/* Trading Chart (centered and large) */}
          <div className="flex-1 bg-gray-900 p-4">
            <div className="h-full w-full bg-gray-800 rounded-md">
              <TradingChart />
            </div>
          </div>

          {/* Order Form below the chart */}
          <div className="bg-gray-900 px-4 pb-4">
            <div className="bg-gray-800 rounded-md p-4">
              {/* Trading Tabs */}
              <div className="flex mb-4">
                {["Spot", "Cross 3x", "Isolated 10x"].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-1 rounded-md ${
                      selectedTradeType === type ? "bg-yellow-500 text-black" : ""
                    }`}
                    onClick={() => setSelectedTradeType(type)}
                  >
                    {type}
                  </button>
                ))}
                <div className="ml-auto flex items-center">
                  <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded mr-2">
                    NEW
                  </div>
                  <span className="text-xs">
                    0% trading fee on this BTC pair
                  </span>
                </div>
              </div>

              {/* Order types */}
              <div className="flex mb-4">
                {["Limit", "Market", "Stop-limit"].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-1 ${
                      selectedOrderType === type ? "border-b-2 border-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedOrderType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Order form: Buy & Sell */}
              <div className="flex gap-4">
                {/* Buy Form */}
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Avbl</span>
                      <span>9,500.068107 USDT</span>
                    </div>
                    <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span>Price</span>
                      <span>{price.toFixed(2)} USDT</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span>Amount</span>
                      <input
                        type="number"
                        className="bg-transparent border-none focus:outline-none text-right w-24"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                      <span>BTC</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-700 h-2 rounded mb-4">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{
                          width: `${amount > 0 ? Math.min(amount * 10, 100) : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span>Total</span>
                      <span>{(amount * price).toFixed(2)} USDT</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-500 text-white py-3 rounded-md font-bold">
                    Buy BTC
                  </button>
                </div>

                {/* Sell Form */}
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Avbl</span>
                      <span>0.41778774 BTC</span>
                    </div>
                    <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span>Price</span>
                      <span>{price.toFixed(2)} USDT</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span>Amount</span>
                      <input
                        type="number"
                        className="bg-transparent border-none focus:outline-none text-right w-24"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                      <span>BTC</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-700 h-2 rounded mb-4">
                      <div
                        className="bg-red-500 h-2 rounded"
                        style={{
                          width: `${amount > 0 ? Math.min(amount * 10, 100) : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span>Total</span>
                      <span>{(amount * price).toFixed(2)} USDT</span>
                    </div>
                  </div>

                  <button className="w-full bg-red-500 text-white py-3 rounded-md font-bold">
                    Sell BTC
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trading Bot */}
        <div className="w-64 bg-gray-800 border-l border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <p className="text-lg">Trading Bot</p>
          </div>

          <div className="p-4">
            {/* Aggressive Bot */}
            <div
              className={`mb-4 p-4 rounded-lg bg-red-100 ${
                activeTradingBot === "aggressive" ? "ring-2 ring-red-500" : ""
              }`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <div className="bg-red-300 rounded-lg p-2">🤖</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900">Aggressive Bot:</h3>
                  <p className="text-xs text-red-900">
                    High-risk, high-reward strategies for experienced traders.
                  </p>
                </div>
              </div>
              <button
                className="w-full bg-red-400 text-white rounded-md py-1 mt-2 text-sm"
                onClick={() => handleBotSelection("aggressive")}
              >
                TRADE
              </button>
            </div>

            {/* Moderate Bot */}
            <div
              className={`mb-4 p-4 rounded-lg bg-yellow-100 ${
                activeTradingBot === "moderate" ? "ring-2 ring-yellow-500" : ""
              }`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <div className="bg-yellow-300 rounded-lg p-2">🤖</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-900">Moderate Bot:</h3>
                  <p className="text-xs text-yellow-900">
                    Balanced risk-reward approach.
                  </p>
                </div>
              </div>
              <button
                className="w-full bg-yellow-400 text-black rounded-md py-1 mt-2 text-sm"
                onClick={() => handleBotSelection("moderate")}
              >
                TRADE
              </button>
            </div>

            {/* Conservative Bot */}
            <div
              className={`mb-4 p-4 rounded-lg bg-blue-100 ${
                activeTradingBot === "conservative" ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <div className="bg-blue-300 rounded-lg p-2">🤖</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900">Conservative Bot:</h3>
                  <p className="text-xs text-blue-900">
                    Lower-risk strategies, focusing on stable returns.
                  </p>
                </div>
              </div>
              <button
                className="w-full bg-purple-500 text-white rounded-md py-1 mt-2 text-sm"
                onClick={() => handleBotSelection("conservative")}
              >
                TRADE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
