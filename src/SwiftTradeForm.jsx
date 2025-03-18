import React from "react";
import { Button } from "./components/button.jsx";
import { Input } from "./components/input.jsx";

const SwiftTradeForm = () => {
  return (
    <div className="pt-16  flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 font-poppins">
      <h1 className="text-3xl font-bold text-center">Welcome To SwiftTrade</h1>
      <p className="text-sm text-gray-400 mb-8 text-center">Let us understand you before going ahead</p>

      {/* Centered Form */}
      <div className="flex flex-col items-center w-full max-w-lg gap-8">
        {/* Personal & Financial Background */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl text-white w-full max-w-md shadow-lg text-center">
          <h2 className="text-lg font-semibold mb-4">1. Personal & Financial Background</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-1">What is your total annual income?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your total annual income" />
            </div>
            <div>
              <p className="mb-1">What is your current occupation?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your occupation" />
            </div>
            <div>
              <p className="mb-1">What is your country of residence?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your country of residence" />
            </div>
            <div>
              <p className="mb-1">What is your approximate net worth?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your approximate net worth" />
            </div>
            <div>
              <p className="mb-1">How much of your total savings are you willing to invest?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter amount you're willing to invest" />
            </div>
          </div>

        {/* Investment Goals & Risk Tolerance */}
        {/* <div className="bg-[#1a1a1a] p-6 rounded-xl text-white w-full max-w-md shadow-lg text-center"> */}
          <h2 className="text-lg font-semibold mb-4">2. Investment Goals & Risk Tolerance</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-1">What is your primary investment goal?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your primary investment goal" />
            </div>
            <div>
              <p className="mb-1">How do you feel about risk in trading?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your feelings about risk" />
            </div>
            <div>
              <p className="mb-1">What is your investment experience?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your investment experience" />
            </div>
            <div>
              <p className="mb-1">What would you do if your investment drops by 10% in a week?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter your response" />
            </div>
            <div>
              <p className="mb-1">How long do you plan to invest?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter duration" />
            </div>
            <div>
              <p className="mb-1">Do you have experience in trading or investing?</p>
              <Input className="w-full bg-white text-black p-2 rounded-md" placeholder="Enter experience details" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <Button className="mt-8 px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">
        Next
      </Button>

      {/* Ensure Poppins Font Loads */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default SwiftTradeForm;
