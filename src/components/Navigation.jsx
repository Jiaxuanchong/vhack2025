// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navigation() {
  // Define navigation items with string paths
  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Trading Bots', path: '/trading-bots' },
    { label: 'Support', path: '/chatbot' },
    { label: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <nav className=" bg-black p-4">
      {/* Logo Section */}
        <div className="absolute top-6 left-8 flex items-center space-x-3">
          <img src={logo} alt="SwiftTrade Logo" className="w-6 h-auto opacity-90" />
          <p className="text-x0.5 font-medium tracking-wide">SwiftTrade</p>
        </div>
      
      <ul className="flex space-x-8 justify-center">
        {navItems.map((item, index) => (
          <li key={index} className="">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'border-b-3 border-indigo-100 text-purple-400 pb-4'
                  : 'text-gray-400 hover:text-indigo-200'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
