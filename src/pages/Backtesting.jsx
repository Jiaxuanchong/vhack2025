// src/components/BacktestingPage.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import apiService from '../service/api';

export default function BacktestingPage() {
  const [mode, setMode] = useState('backtesting');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // In BacktestingPage.jsx, update the handleRun function:

const handleRun = async () => {
  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    const payload = {
      strategyName: "MeanReversionX",
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      initialCapital: 10000,
      commissionRate: 0.001,
      minCommission: 0.0,
      allowForwardTest: mode === "forwardtesting",
      allowPermutation: false,
      assets: ["btc"],
      runtimeMode: mode === "forwardtesting" ? "live-trade" : "backtest",
      entryExitMode: "mean-reversion",
      positionSizingMode: "auto",
      maxPositionSize: 1.0,
      stopLoss: 0.2,
      takeProfit: 0.2,
    };

    // Choose backend based on mode
    const backend = mode === "forwardtesting" ? "secondary" : "primary";
    
    console.log("Sending payload to", backend, "backend:", payload);
    const response = await apiService.simulateBacktest(payload, backend);
    console.log("Received response:", response);

    if (response.success) {
      setResult(response.data.backtestResult);
    } else {
      setError(response.error || { message: "Unknown error occurred" });
    }
  } catch (err) {
    console.error("Error during backtest:", err);
    setError({
      message: "Failed to run backtest",
      details: err.message,
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Strategy</h1>

        <div className="flex flex-wrap items-start justify-between gap-6 bg-gray-900 p-6 rounded-xl shadow-lg">
          {/* Start Date Picker */}
          <div className="relative">
            <span className="text-sm text-white mb-1 block">Start Date</span>
            <button
              onClick={() => setShowStartCalendar(!showStartCalendar)}
              className="bg-gray-800 text-purple-300 border border-purple-400 px-4 py-2 rounded hover:bg-gray-700"
            >
              {startDate ? format(startDate, 'PPP') : 'Select date'}
            </button>
            {showStartCalendar && (
              <div className="absolute z-10 mt-2 bg-zinc-800 border border-purple-700 rounded-lg shadow-lg">
                <DayPicker
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setShowStartCalendar(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* End Date Picker */}
          <div className="relative">
            <span className="text-sm text-white mb-1 block">End Date</span>
            <button
              onClick={() => setShowEndCalendar(!showEndCalendar)}
              className="bg-gray-800 text-purple-300 border border-purple-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              {endDate ? format(endDate, 'PPP') : 'Select date'}
            </button>
            {showEndCalendar && (
              <div className="absolute z-10 mt-2 bg-zinc-900 border border-purple-700 rounded-lg shadow-lg">
                <DayPicker
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setShowEndCalendar(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Mode Toggle */}
          <div>
            <span className="text-sm text-purple-200 mb-1 block">Testing Mode</span>
            <div className="flex space-x-2 bg-gray-800 border border-purple-600 rounded-lg p-1">
              <button
                onClick={() => setMode('backtesting')}
                className={`px-4 py-2 rounded ${
                  mode === 'backtesting'
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-300 hover:bg-gray-700'
                }`}
              >
                Backtesting
              </button>
              <button
                onClick={() => setMode('forwardtesting')}
                className={`px-4 py-2 rounded ${
                  mode === 'forwardtesting'
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-300 hover:bg-gray-700'
                }`}
              >
                Forward
              </button>
            </div>
          </div>
        </div>

        {/* Run Button */}
        <div className="mt-8">
          <button
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow"
            onClick={handleRun}
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : (mode === 'backtesting' ? 'Backtest' : 'Forward Test')}
          </button>
        </div>

        {/* Result or Error */}
        {result !== null && (
          <div className="mt-4 text-green-400 text-lg font-semibold">
            ✅ Backtest Result: {result}
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-400">
            ❌ {error.message}
            {error.details && <div>🔍 {error.details}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
