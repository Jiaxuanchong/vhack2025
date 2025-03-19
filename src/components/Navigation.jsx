import React from 'react';
import logo from '../assets/logo.png';
function Navigation() {
  const navItems = ['Dashboard', 'News & Community', 'Support', 'Portfolio'];
  
  return (
    
    <nav className="bg-gray-900 p-4 border-b border-gray-800">
        {/* Add logo and title */}
        <div className="absolute top-5 left-6 flex items-center space-x-2">
            <img src={logo} alt="SwiftTrade Logo" className="w-6 h-auto" />
            <p className="text-white text-lg font-bold">SwiftTrade</p>
        </div>
        
      <ul className="flex space-x-8 justify-center">
        {navItems.map((item, index) => (
          <li key={index} className={`${index === 1 ? 'border-b-2 border-indigo-100 text-indigo-400' : 'text-gray-400'} pb-2`}>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;