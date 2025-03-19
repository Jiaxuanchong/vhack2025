import React, { useState } from "react";
import {Button} from "./button.jsx";

function Chatbot() {
  const [text, setText] = useState(""); 

  return (
    <div className="w-60 bg-gray-900 border-r border-gray-800 p-4 flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-8">Chatbot</h2>

      {/* Push content to the bottom */}
      <div className="mt-auto flex flex-col gap-2 pb-15">
        {/* Type your questions button */}
        <input
          type="text"
          className="border border-gray-400 rounded-md px-4 py-2"
          placeholder="Type your questions here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* Past Questions */}
        <Button
          className="bg-gray-800 rounded-lg p-2 text-sm w-full text-left"
          onClick={() => console.log("Past Question clicked")}
        >
          Past Question
        </Button>

        <Button
          className="bg-gray-800 rounded-lg p-2 text-sm w-full text-left"
          onClick={() => console.log("Past Question clicked")}
        >
          Past Question
        </Button>

        {/* Guide Button */}
        <Button
          className="bg-gray-800 rounded-lg p-2 flex items-center justify-center w-full"
          onClick={() => console.log("Guide clicked")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Guide</span>
        </Button>
      </div>
    </div>
  );
}

export default Chatbot;
