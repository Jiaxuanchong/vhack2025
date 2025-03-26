import { useState, useEffect } from "react";
import { Menu, X, Send } from "lucide-react";
import profile from "../assets/profile.jpg";
import chatbot from "../assets/chatbot.jpg";

export default function Chatbot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Predefined answers for suggested questions
  const predefinedAnswers = {
    "What is the current latest news related bitcoin?": "Good morning! Let me provide you with a comprehensive market overview:\n\nBitcoin is currently experiencing a consolidation phase after recent volatility. As of today, the price is hovering around $65,400, with key technical indicators suggesting:\n\n• 50-day Moving Average: $62,800\n• 200-day Moving Average: $54,600\n• Relative Strength Index (RSI): 58 (neutral territory)\n\nThe market is showing signs of potential bullish momentum, but traders should be cautious of upcoming macroeconomic events that could impact cryptocurrency valuations. The recent halving event in April has historically been a catalyst for price appreciation, but current market sentiment remains mixed.\n\nWould you like me to dive deeper into any specific aspect of the current Bitcoin market?",
    
    "What is stock diversification?": "Stock diversification is a risk management strategy that involves spreading investments across various financial instruments, industries, and other categories to reduce overall investment risk. Here's a comprehensive breakdown:\n\n• Core Principle: 'Don't put all your eggs in one basket'\n• Benefits:\n  - Reduces portfolio volatility\n  - Minimizes potential losses\n  - Provides exposure to multiple market sectors\n\n• Diversification Strategies:\n  1. Across different sectors (tech, healthcare, finance)\n  2. Geographic diversification\n  3. Mix of growth and value stocks\n  4. Different market capitalizations\n\n• Recommended Allocation:\n  - 60-70% domestic stocks\n  - 20-30% international stocks\n  - 10-20% alternative investments\n\nKey Tip: Regular portfolio rebalancing is crucial to maintain your desired diversification level.",
    
    "How does cryptocurrency work?": "Cryptocurrency is a digital or virtual currency that uses cryptography for security. Here's a detailed explanation:\n\n🔒 Key Technologies:\n• Blockchain: Decentralized, distributed ledger technology\n• Cryptography: Secure, transparent transaction verification\n• Consensus Mechanisms: Proof of Work, Proof of Stake\n\n📊 Basic Operational Flow:\n1. Transaction Initiation\n2. Transaction Broadcast to Network\n3. Verification by Network Nodes\n4. Transaction Added to Blockchain\n5. Permanent, Immutable Record Created\n\n💡 Core Characteristics:\n• Decentralized (no central authority)\n• Pseudonymous Transactions\n• Global Accessibility\n• Lower Transaction Fees\n• Fast International Transfers\n\n⚠️ Risks to Consider:\n• High Volatility\n• Regulatory Uncertainty\n• Technological Complexity\n• Potential Security Vulnerabilities\n\nRecommendation: Start with small investments, continuous learning.",
    
    "Predict the price of the bitcoin": "Bitcoin Price Prediction Analysis (Disclaimer: Not Financial Advice):\n\n📈 Current Market Snapshot:\n• Current Price: $65,400\n• 2024 Projected Range: $55,000 - $85,000\n\n🔍 Predictive Factors:\n1. Halving Event Impact\n2. Institutional Adoption\n3. Macroeconomic Conditions\n4. Regulatory Developments\n\n📊 Technical Analysis:\n• Short-term Support: $62,000\n• Resistance Level: $70,000\n• 200-day Moving Average: $54,600\n\n🌐 Potential Scenarios:\n• Bullish Scenario: $90,000 - $100,000\n• Neutral Scenario: $65,000 - $75,000\n• Bearish Scenario: $50,000 - $60,000\n\n⚠️ Critical Considerations:\n• High Volatility Expected\n• Multiple External Factors\n• Recommend Diversified Investment Strategy\n\nAdvice: Always conduct personal research and consult financial advisors."
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.3);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.5);
      }
      * {
        scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const sendMessage = (message) => {
    let userMessage = message;
    let botResponse = "";

    // If it's a suggested question, use predefined answer
    if (predefinedAnswers[message]) {
      botResponse = predefinedAnswers[message];
    } else {
      // If it's a manual input
      userMessage = input;
      botResponse = "I'm processing your request. How can I provide more specific insights?";
    }

    // Update messages with user message
    const newMessages = [
      ...messages, 
      { text: userMessage, sender: "user" }
    ];

    setMessages(newMessages);
    setInput("");
    setConversationStarted(true);
    setIsTyping(true);

    // Delayed bot response after 3 seconds
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages, 
        { text: botResponse, sender: "bot" }
      ]);
      setIsTyping(false);
    }, 3000);
  };

  const suggestedQuestions = [
    "What is the current latest news related bitcoin?", 
    "What is stock diversification?", 
    "How does cryptocurrency work?", 
    "Predict the price of the bitcoin"
  ];

  return (
    <div className="flex h-screen bg-black text-white font-poppins">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141718] p-4 transition-transform border-r border-gray-700 overflow-y-auto max-h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <button onClick={() => setSidebarOpen(false)} className="mb-4">
          <X className="w-6 h-6 text-white" />
        </button>
        <p className="text-sm text-gray-300">Chat History</p>
        <ul className="mt-2 space-y-1">
          {messages.map((msg, index) => (
            <li key={index} className="p-2 rounded text-base cursor-pointer transition duration-200 hover:bg-gray-700">
              {msg.text.substring(0, 20)}...
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex flex-1 flex-col items-center w-full pb-10 transition-all duration-300 ${sidebarOpen ? "pl-80" : "pl-0"}`}>
        <button onClick={() => setSidebarOpen(true)} className="absolute left-6 top-6">
          <Menu className="w-6 h-6 mt-14 text-white" />
        </button>
        
        {!conversationStarted ? (
          <div className="flex flex-col items-center justify-center space-y-4 h-full px-4">
            <h1 className="text-4xl font-extrabold text-gray-100 mb-8">Welcome to FinQues</h1>
        
            <div className="flex flex-wrap gap-4 max-w-2xl justify-center ">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="px-4 py-2 bg-white/20 hover:bg-purple-500 text-white text-sm rounded-lg transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
        
            <div className="flex items-center w-full max-w-3xl bg-gray-800 rounded-xl  transition-all mt-3">
              <input
                type="text"
                placeholder="Type your finance question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent p-3 text-white text-lg outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                className="px-6 py-3 bg-purple-300 hover:bg-purple-400 text-purple-900 font-medium text-lg rounded-r-xl shadow-lg transition-transform duration-200 hover:scale-105"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className={`w-full max-w-3xl flex flex-col space-y-8 flex-grow mt-16 transition-all duration-300 ${sidebarOpen ? "left-[60%]" : "left-1/2"}`}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-center space-x-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "bot" && <img src={chatbot} alt="Chatbot" className="w-12 h-12 rounded-full" />}
                <div className={`px-6 py-4 rounded-xl shadow-lg ${msg.sender === "user" ? "bg-purple-300 text-black" : "bg-gray-800 text-white"}`}>
                  {msg.text}
                </div>
                {msg.sender === "user" && <img src={profile} alt="User" className="w-12 h-12 rounded-full" />}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-6 justify-start">
                <img src={chatbot} alt="Chatbot" className="w-12 h-12 rounded-full" />
                <div className="px-6 py-4 rounded-xl bg-gray-800 text-gray-400">Typing...</div>
              </div>
            )}
            <div className={`flex items-center space-x-4 bg-gray-800 p-3 rounded-xl fixed bottom-6 transition-all duration-300 ${sidebarOpen ? "left-[60%]" : "left-1/2"} transform -translate-x-1/2 w-full max-w-3xl`}>
              <input
                type="text"
                placeholder="Ask anything"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-4 bg-transparent outline-none text-white"
              />
             <button onClick={() => sendMessage(input)} className="p-2 bg-gray-700 rounded-full">
              <Send className="w-5 h-5 text-white" />
            </button> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
}