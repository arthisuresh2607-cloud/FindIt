import React from 'react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="mt-auto bg-sky-950 border-t border-sky-900 text-sky-200/70 py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div>
          <p className="font-bold text-white text-sm">FindIt Portal Systems Inc.</p>
          <p className="mt-0.5 text-sky-300/50">Automated Asset Reallocation Infrastructure & Logistics.</p>
        </div>
        <div className="flex space-x-6 font-semibold">
          <button onClick={() => setCurrentPage("Home")} className="text-sky-200 hover:text-white transition-colors">Home</button>
          <button onClick={() => setCurrentPage("ViewItems")} className="text-sky-200 hover:text-white transition-colors">Search Items</button>
          <button onClick={() => setCurrentPage("About")} className="text-sky-200 hover:text-white transition-colors">About Us</button>
          <button onClick={() => setCurrentPage("Contact")} className="text-sky-200 hover:text-white transition-colors">Contact Us</button>
        </div>
        <p className="text-sky-300/40">© 2026 FindIt Tracker. Competition Standard Layout.</p>
      </div>
    </footer>
  );
}