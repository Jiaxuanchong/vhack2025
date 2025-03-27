import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Button } from "../components/button.jsx";
import SurveryResultPage from "./SurveyResultPage.jsx";
import logo from "../assets/logo.png";


// Register required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const questions = [
  { text: "How comfortable are you with taking risks in trading?", options: [
      { label: "I avoid risks and prefer safe investments", impact: { riskTolerance: 1 } },
      { label: "I take moderate risks for better returns", impact: { riskTolerance: 3 } },
      { label: "I am willing to take high risks for high rewards", impact: { riskTolerance: 5 } }
    ]
  },
  { text: "What is your typical investment horizon?", options: [
      { label: "Long-term (more than 1 year) ", impact: { investmentHorizon: 1 } },
      { label: "Medium-term (a few months)", impact: { investmentHorizon: 3 } },
      { label: "Short-term (days to weeks)", impact: { investmentHorizon: 5 } }
    ]
  },
  { text: "How often do you trade?", options: [
      { label: "Rarely", impact: { tradingFrequency: 1 } },
      { label: "Occasionally", impact: { tradingFrequency: 3 } },
      { label: "Actively (daily/weekly)", impact: { tradingFrequency: 5 } }
    ]
  },
  { text: "How long do you typically hold onto an asset before selling?", options: [
      { label: "I hold for years, focusing on long-term growth", impact: { investmentHorizon: 1 } },
      { label: "I hold for months, adjusting based on market trends", impact: { investmentHorizon: 3 } },
      { label: "I trade frequently, holding assets for days or weeks", impact: { investmentHorizon: 5 } }
    ]
  },
  { text: "Do you use leverage in your trades?", options: [
      { label: "No, I avoid leverage", impact: { leverageUsage: 1 } },
      { label: "Sometimes, but with limits", impact: { leverageUsage: 3 } },
      { label: "Yes, I use high leverage", impact: { leverageUsage: 5 } }
    ]
  },
  { text: "What is your profit expectation per trade?", options: [
      { label: "Small and consistent gains", impact: { profitExpection: 1 } },
      { label: "Moderate gains with some risk", impact: { profitExpection: 3 } },
      { label: "High profits, even with high risk", impact: { profitExpection: 5 } }
    ]
  },
  { text: "Do you use stop-loss and take-profit strategies?", options: [
      { label: "Yes, always use theses strategies", impact: { tradingFrequency: 1 } },
      { label: "Sometimes, when I feel it's necessary", impact: { tradingFrequency: 3 } },
      { label: "Rarely, I almost don't use these strategies", impact: { tradingFrequency: 5 } }
    ]
  },
  { text: "How do you approach uncertain market conditions?", options: [
      { label: "I prefer to exit trades quickly to avoid losses", impact: { riskTolerance: 1 } },
      { label: "I wait and see before making a decision", impact: { riskTolerance: 3 } },
      { label: "I see uncertainty as an opportunity and take calculated risks", impact: { riskTolerance: 5 } }
    ]
  },
  { text: "How do you handle market volatility?", options: [
      { label: "I avoid volatile markets", impact: { marketVolatilityPre: 1 } },
      { label: "I accept some volatility", impact: { marketVolatilityPre: 3 } },
      { label: "I thrive in high volatility", impact: { marketVolatilityPre: 5 } }
    ]
  },
  { text: "What type of assets do you prefer trading?", options: [
      { label: "Stable assets like bonds/stocks", impact: { marketVolatilityPre: 1 } },
      { label: "Crypto, but only stable coins", impact: { marketVolatilityPre: 3 } },
      { label: "Crypto with high volatility", impact: { marketVolatilityPre: 5 } }
    ]
  }
];

const SwiftTrade = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    riskTolerance: 0,
    tradingFrequency: 0,
    investmentHorizon: 0,
    leverageUsage: 0,
    profitExpection: 0,
    marketVolatilityPre: 0,
  });

  const navigate = useNavigate();

  const handleAnswer = (impact) => {
    setUserData((prevData) => {
      const newData = { ...prevData };
      Object.keys(impact).forEach((key) => {
        newData[key] += impact[key]; // Accumulate scores properly
      });
      return newData;
    });

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to another page after the last answer
      navigate("/results"); // Adjust "/results" to your desired route
    }
  };

  const radarData = {
    labels: ["Risk Tolerance","Trading Frequency", "Investment Horizon", "Leverage Usage","Profit Expectation", "Market Volatility"],
    datasets: [
      {
        label: "User Profile",
        data: [
          userData.riskTolerance,
          userData.tradingFrequency,
          userData.investmentHorizon,
          userData.leverageUsage,
          userData.profitExpection,
          userData.marketVolatilityPre
        ],
        backgroundColor: "rgb(209, 202, 255, 0.5)",
        borderColor: "rgb(209, 202, 255, 1)",
        borderWidth: 2,
        pointRadius: 4,
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { display: true },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
        suggestedMin: 0,
        suggestedMax: 10, // Correctly set max value
        pointLabels: {
          font: { size: 14, weight: "bold" },
          color: "#ffffff",
        },
        ticks: { display: false , stepSize: 2}
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#09001b] to-[#170f2e]  text-white px-8 py-6 min-h-screen">
  {/* Logo Section */}
    {/* Logo Section */}
      <div className="absolute top-6 left-8 flex items-center space-x-3">
        <img src={logo} alt="SwiftTrade Logo" className="w-6 h-auto opacity-90" />
        <p className="text-x0.5 font-medium tracking-wide">SwiftTrade</p>
      </div>

  <div className="flex w-full">
    <div className="w-1/2 p-6">
      <h1 className="text-xl font-bold mb-3 mt-14 text-purple-300">Master Your Moves: Analyze Before You Trade</h1>
       {/* Question Section with Styled Background */}

        <p className="text-l font-medium text-white text-left">
          {questions[currentStep].text}
        </p>

      {/* Answer Options */}
      <div className="flex flex-col gap-2 mt-6">
        {questions[currentStep].options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option.impact)}
            className="bg-white from-white hover:bg-purple-300 border-2 text-black font-medium py-3 px-3 rounded-xl shadow-lg transition-all duration-150 transform hover:scale-102"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
    <div className="w-1/2 flex justify-center items-center">
      <div className="w-[450px] h-[450px]">
        <Radar data={radarData} options={radarOptions} />
      </div>
    </div>
  </div>
</div>

  );
};

export default SwiftTrade;
