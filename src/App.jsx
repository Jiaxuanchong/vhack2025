import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import CommunityPage from './pages/CommunityPage';
import TradingBotsPage from './pages/TradingBotsPage';
import TradingBotPortfolio from './pages/TradingBotPortfolio';
import Chatbot from './pages/Chatbot';
import SurveyResultPage from './pages/SurveyResultPage'; // Survey page without nav
import './index.css';
import Signup from './pages/Signup';
import SwiftTrade from './pages/SwiftTrade';


const AppContent = () => {
  const location = useLocation();
  // Define routes where you do NOT want to show the navigation bar
  const hideNavRoutes = ['/results','/','/survey']; // adjust this path as needed

  // Determine if the current route should hide the nav bar
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      {/* Conditionally render Navigation */}
      {showNav && <Navigation />}

      {/* Main Content */}
      <div className={`${showNav ? '' : ''}`}>
        <Routes>
          <Route path="/dashboard" element={<CommunityPage />} />
          <Route path="/trading-bots" element={<TradingBotsPage />} />
          <Route path="/portfolio" element={<TradingBotPortfolio />} />
          {/* Set the default route (or survey result route) */}
          <Route path="/results" element={<SurveyResultPage />} />
          <Route path="/survey" element={<SwiftTrade />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


export default App;
