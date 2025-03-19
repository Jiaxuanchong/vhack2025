import React from "react";
import './index.css';
import Dashboard from "./pages/Dashboard";
// import SwiftTrade from "./pages/SwiftTrade";
import CommunityPage from "./pages/CommunityPage";

// function App() {
//   return (
//     <div className="App">
//       <SwiftTrade />
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <Dashboard />
//     </div>
//   );
// }



function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <CommunityPage />
    </div>
  );
}

export default App;

