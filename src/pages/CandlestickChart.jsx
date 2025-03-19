import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";

const TradingChart = () => {
  const [chartData, setChartData] = useState([]);
  const wsRef = useRef(null);

  // ApexCharts options for a line chart (dark mode, purple line, larger time intervals)
  const options = {
    chart: {
      type: "line",
      background: "#1a2038", // dark background
      animations: { enabled: false },
      foreColor: "#ffffff", // white text
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10, // fewer ticks, larger interval between labels
      labels: { datetimeUTC: false, style: { colors: "#ffffff" } }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#ffffff" } }
    },
    stroke: {
      curve: "smooth",
      colors: ["#800080"] // purple line
    },
    tooltip: {
      theme: "dark"
    },
    grid: {
      borderColor: "#334155"
    }
  };

  // WebSocket Setup
  useEffect(() => {
    const connectWebSocket = () => {
      wsRef.current = new WebSocket("wss://stream.datasource.cybotrade.rs");

      wsRef.current.onopen = () => {
        console.log("WebSocket Connected");
        wsRef.current.send(
          JSON.stringify({
            api_key: "",
            topics: ["bybit-linear|candle?interval=1m&symbol=BTCUSDT"],
          })
        );

        // Send PING every 30 seconds
        const pingInterval = setInterval(() => {
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "ping" }));
            console.log("Sent PING");
          }
        }, 30000);
        
        return () => clearInterval(pingInterval);
      };

      wsRef.current.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.type === "delta" && response.data) {
          console.log("Received new data:", response.data);
          // For a line chart, use the closing price and timestamp
          const newDataPoints = response.data.map((candle) => ({
            x: new Date(candle.start_time),
            y: parseFloat(candle.close),
          }));

          setChartData((prevData) => {
            const combined = [...prevData, ...newDataPoints];
            // Remove duplicates based on timestamp and sort chronologically
            const uniqueData = Array.from(
              new Map(combined.map((item) => [item.x.getTime(), item])).values()
            ).sort((a, b) => a.x - b.x);
            // Keep only the last 60 data points
            return uniqueData.slice(-60);
          });
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket Disconnected, reconnecting...");
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{backgroundColor: "#1a2038", minHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "600px", height: "400px", backgroundColor: "#1a2038" }}>
        <h2 style={{ textAlign: "center", color: "#ffffff" }}>
          BTC/USDT Live Line Chart
        </h2>
        <Chart
          options={options}
          series={[{ name: "Close Price", data: chartData }]}
          type="line"
          height={400}
          width={600}
        />
      </div>
    </div>
  );
};

export default TradingChart;
