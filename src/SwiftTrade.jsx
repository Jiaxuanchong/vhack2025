import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Button } from "./components/button.jsx";

// Register required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const questions = [
  { text: "How comfortable are you with managing your finances?", options: [
      { label: "I struggle with budgeting", impact: { financial: 1 } },
      { label: "I manage my budget but sometimes overspend", impact: { financial: 3 } },
      { label: "I track my finances carefully and stick to a budget", impact: { financial: 5 } }
    ]
  },
  { text: "How often do you track and review your expenses?", options: [
      { label: "Rarely, I don’t keep track", impact: { financial: 1 } },
      { label: "Occasionally, when I feel it's necessary", impact: { financial: 3 } },
      { label: "Regularly, I check my budget and spending", impact: { financial: 5 } }
    ]
  },
  { text: "How willing are you to take financial risks for higher rewards?", options: [
      { label: "I avoid financial risks completely", impact: { riskTolerance: 1 } },
      { label: "I take calculated risks", impact: { riskTolerance: 3 } },
      { label: "I embrace high-risk investments", impact: { riskTolerance: 5 } }
    ]
  },
  { text: "If you lost half of your investments in a downturn, what would you do?", options: [
      { label: "Sell everything immediately to prevent further loss", impact: { riskTolerance: 1 } },
      { label: "Hold on and wait for recovery", impact: { riskTolerance: 3 } },
      { label: "Invest more to buy at lower prices", impact: { riskTolerance: 5 } }
    ]
  },
  { text: "How experienced are you in investing or financial planning?", options: [
      { label: "I have little to no experience", impact: { experience: 1 } },
      { label: "I have some knowledge and have made investments", impact: { experience: 3 } },
      { label: "I actively manage my investments", impact: { experience: 5 } }
    ]
  },
  { text: "How many years have you actively managed your own investments?", options: [
      { label: "Less than a year", impact: { experience: 1 } },
      { label: "1-5 years", impact: { experience: 3 } },
      { label: "More than 5 years", impact: { experience: 5 } }
    ]
  },
  { text: "How well do you handle financial uncertainty or economic downturns?", options: [
      { label: "I get anxious and withdraw from investments", impact: { stability: 1 } },
      { label: "I remain cautious but stay invested", impact: { stability: 3 } },
      { label: "I see downturns as opportunities", impact: { stability: 5 } }
    ]
  },
  { text: "Do you prefer stable, long-term investments over short-term high-risk ones?", options: [
      { label: "I prefer only safe, long-term investments", impact: { stability: 1 } },
      { label: "I like a mix of both", impact: { stability: 3 } },
      { label: "I actively seek short-term high-risk investments", impact: { stability: 5 } }
    ]
  },
  { text: "How quickly do you recover from financial setbacks?", options: [
      { label: "It takes me a long time to recover", impact: { resilience: 1 } },
      { label: "I adjust and move on within a reasonable time", impact: { resilience: 3 } },
      { label: "I bounce back quickly and find new opportunities", impact: { resilience: 5 } }
    ]
  },
  { text: "When facing financial difficulties, how adaptable are you in making changes?", options: [
      { label: "I find it hard to adapt", impact: { resilience: 1 } },
      { label: "I make adjustments when needed", impact: { resilience: 3 } },
      { label: "I am very adaptable and find new solutions quickly", impact: { resilience: 5 } }
    ]
  }
];

const SwiftTrade = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    financial: 0,
    riskTolerance: 0,
    experience: 0,
    stability: 0,
    resilience: 0
  });

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
    }
  };

  const radarData = {
    labels: ["Financial", "Risk Tolerance", "Experience", "Stability", "Resilience"],
    datasets: [
      {
        label: "User Profile",
        data: [
          userData.financial,
          userData.riskTolerance,
          userData.experience,
          userData.stability,
          userData.resilience
        ],
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6">SwiftTrade - Investment Assessment</h1>
        <p className="text-lg mb-6">{questions[currentStep].text}</p>
        <div className="flex flex-col gap-4">
          {questions[currentStep].options.map((option, index) => (
            <Button key={index} onClick={() => handleAnswer(option.impact)} className="bg-white hover:bg-blue-300 text-black py-3 px-6 rounded-lg shadow-lg">
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
  );
};

export default SwiftTrade;
