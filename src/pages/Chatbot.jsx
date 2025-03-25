import { useState, useEffect } from "react";
import { Menu, X, Send } from "lucide-react";
import profile from "../assets/profile.jpg";
import chatbot from "../assets/chatbot.jpg";

export default function ChatUI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setConversationStarted(true);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: "That's an interesting question!", sender: "bot" }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#141718] text-white font-poppins">
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

      <div className={`flex flex-1 flex-col items-center w-full p-10 transition-all duration-300 ${sidebarOpen ? "pl-80" : "pl-0"}`}>
        <button onClick={() => setSidebarOpen(true)} className="absolute left-6 top-6">
          <Menu className="w-6 h-6 text-white" />
        </button>
        
        {!conversationStarted ? (
          <div className="flex flex-col items-center justify-center space-y-8 h-full">
            <h1 className="text-4xl font-bold">Welcome to FinQuestionArea</h1>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full max-w-3xl bg-gray-800 p-5 rounded-xl outline-none text-white"
            />
            <button onClick={sendMessage} className="p-4 bg-gray-700 rounded-full">Send</button>
          </div>
        ) : (
          <div className={`w-full max-w-3xl flex flex-col space-y-8 flex-grow mt-16 transition-all duration-300 ${sidebarOpen ? "left-[60%]" : "left-1/2"}`}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-center space-x-6 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "bot" && <img src={chatbot} alt="Chatbot" className="w-12 h-12 rounded-full" />}
                <div className={`px-6 py-4 rounded-xl shadow-lg ${msg.sender === "user" ? "bg-blue-600" : "bg-gray-800"}`}>
                  {msg.text}
                </div>
                {msg.sender === "user" && <img src={profile} alt="User" className="w-12 h-12 rounded-full" />}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-6 justify-start">
                <img src={chatbot} alt="Chatbot" className="w-12 h-12 rounded-full" />
                <div className="px-6 py-4 rounded-xl shadow-lg bg-gray-800 text-gray-400">Typing...</div>
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
             <button onClick={sendMessage} className="p-2 bg-gray-700 rounded-full">
              <Send className="w-5 h-5 text-white" />
            </button> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
}