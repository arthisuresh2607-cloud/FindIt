import React from 'react';
// 🛠️ Updated path to exit components/ back to src/, then into pages/context/ThemeContext
import { useTheme } from "../pages/context/ThemeContext";

export default function Navbar({ currentPage, setCurrentPage, currentUser, setCurrentUser, notifications, setNotifications }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-sky-950 border-b border-sky-900 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand Anchor */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setCurrentPage("Home")}>
            <div className="w-8 h-8 flex items-center justify-center text-sky-400 transition-transform group-hover:scale-110">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-6 h-6 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-sky-300 to-blue-200 bg-clip-text text-transparent select-none">
              FindIt
            </span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-2 bg-sky-900/60 p-1.5 rounded-2xl border border-sky-800/60">
            <button 
              onClick={() => setCurrentPage("Home")} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === "Home" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]" 
                  : "hover:bg-sky-800/50 text-sky-200 hover:text-white"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage("Report")} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === "Report" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]" 
                  : "hover:bg-sky-800/50 text-sky-200 hover:text-white"
              }`}
            >
              Report Entry
            </button>
            <button 
              onClick={() => setCurrentPage("ViewItems")} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === "ViewItems" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]" 
                  : "hover:bg-sky-800/50 text-sky-200 hover:text-white"
              }`}
            >
              Search Items
            </button>
            
            {/* 🛠️ NEW ADDITION: LEADERBOARD NAV BUTTON LINK */}
            <button 
              onClick={() => setCurrentPage("Leaderboard")} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === "Leaderboard" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]" 
                  : "hover:bg-sky-800/50 text-sky-200 hover:text-white"
              }`}
            >
            Leaderboard
            </button>

            <button 
              onClick={() => setCurrentPage("About")} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === "About" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]" 
                  : "hover:bg-sky-800/50 text-sky-200 hover:text-white"
              }`}
            >
              About Us
            </button>
          </div>

          {/* Right Controls Segment */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-xl bg-sky-900/80 text-sm text-white hover:scale-105 transition-transform cursor-pointer focus:outline-none"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative group">
              <button className="p-2 rounded-xl bg-sky-900/80 text-sm relative text-white">
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              <div className="absolute right-0 mt-2 w-64 bg-sky-900 rounded-2xl shadow-xl border border-sky-800 p-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-sky-800">
                  <h4 className="font-bold text-xs text-white">Alert Queue Feed</h4>
                  <button onClick={() => setNotifications(n => n.map(x => ({...x, read: true})))} className="text-[11px] font-semibold text-sky-300 hover:underline">Mark all read</button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-2.5 text-xs text-sky-200/60 text-center">No alerts logged</div>
                  ) : notifications.map(n => (
                    <div key={n.id} className="p-2.5 text-xs rounded-xl bg-sky-950 border border-sky-800 text-sky-100">
                      {n.message || n.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {currentUser ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-sky-800">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {currentUser.name.charAt(0)}
                </div>
                <button onClick={() => { setCurrentUser(null); setCurrentPage("Home"); }} className="text-xs font-bold text-rose-300 hover:text-rose-400 transition-all hidden sm:block">Logout</button>
              </div>
            ) : (
              <button onClick={() => setCurrentPage("Login")} className="text-xs font-bold text-sky-300 hover:text-white pl-2 border-l border-sky-800">Sign In</button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}