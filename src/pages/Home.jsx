import React, { useState } from 'react';

export default function Home({ stats, setCurrentPage, setSearchQuery, setFilterCategory, setFilterType, CATEGORIES }) {
  // State to manage which FAQ item is open
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // FAQ Data array containing common issues faced on the platform
  const faqs = [
    {
      question: "Why is my reported item displaying as 'N/A' or 'Undefined' in the list?",
      answer: "This usually happens if a required field wasn't filled out completely or if there was a brief network hiccup during submission. Try refreshing the page. If it still shows 'N/A', you can quickly edit your post or re-submit a report to clear it up."
    },
    {
      question: "How do I claim an item that I found listed on FindIt?",
      answer: "When you locate your missing item in the catalog, click the 'Claim Item' button. You will be prompted to provide a specific detail not shown in the public photo (like a laptop password, serial number, or bag contents) so our campus admins can safely verify your ownership."
    },
    {
      question: "Where should I physically take an item that I found on campus?",
      answer: "Please drop the physical item off at the Reception, College Main building(ground floor) and make sure to log that location accurately in your FindIt report."
    },
    {
      question: "How long do items stay registered in the FindIt system?",
      answer: "Items remain active in our searchable digital catalog for up to 30 days. After 30 days, unclaimed items are securely transferred to the main campus lost-and-found central repository."
    },
    {
      question: "Can I delete or edit a report after my item has been safely recovered?",
      answer: "Yes! Simply navigate to your personal dashboard, locate the item record, and click 'Mark as Resolved'. This keeps the public feed clean and celebrates another successful campus recovery!"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* HERO SECTION - WELCOME TEXT */}
      <div className="text-center max-w-3xl mx-auto space-y-6 py-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Join a Smarter <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Campus Community</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
          Where every report brings someone closer to what they've been searching for.
        </p>

        {/* Action Button Segment */}
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setCurrentPage("Report")} 
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5"
          >
            Report Lost Item
          </button>
          <button 
            onClick={() => { setFilterType('Found'); setFilterCategory(''); setSearchQuery(''); setCurrentPage('ViewItems'); }} 
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
          >
            View Found Items
          </button>
        </div>
      </div>

      {/* HIGHLIGHTED 4-TAB STATS INFRASTRUCTURE WITH BLUE THEME */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-sky-950/20 dark:to-slate-900 rounded-3xl border-2 border-blue-100 dark:border-blue-900/60 shadow-md shadow-blue-500/5 text-center transition-all hover:scale-[1.03] hover:border-blue-400">
          <span className="text-2xl filter drop-shadow"></span>
          <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">{stats.totalLost}</h3>
          <p className="text-[11px] text-blue-500/80 dark:text-slate-400 uppercase tracking-wider font-extrabold mt-1">Active Lost Logs</p>
        </div>
        
        <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-sky-950/20 dark:to-slate-900 rounded-3xl border-2 border-blue-100 dark:border-blue-900/60 shadow-md shadow-blue-500/5 text-center transition-all hover:scale-[1.03] hover:border-blue-400">
          <span className="text-2xl filter drop-shadow"></span>
          <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">{stats.totalFound}</h3>
          <p className="text-[11px] text-blue-500/80 dark:text-slate-400 uppercase tracking-wider font-extrabold mt-1">Unclaimed Matches</p>
        </div>
        
        <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-sky-950/20 dark:to-slate-900 rounded-3xl border-2 border-blue-100 dark:border-blue-900/60 shadow-md shadow-blue-500/5 text-center transition-all hover:scale-[1.03] hover:border-blue-400">
          <span className="text-2xl filter drop-shadow"></span>
          <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">{stats.totalClaimed}</h3>
          <p className="text-[11px] text-blue-500/80 dark:text-slate-400 uppercase tracking-wider font-extrabold mt-1">Successful Returns</p>
        </div>
        
        <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-sky-950/20 dark:to-slate-900 rounded-3xl border-2 border-blue-100 dark:border-blue-900/60 shadow-md shadow-blue-500/5 text-center transition-all hover:scale-[1.03] hover:border-blue-400">
          <span className="text-2xl filter drop-shadow"></span>
          <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">{stats.pendingClaims}</h3>
          <p className="text-[11px] text-blue-500/80 dark:text-slate-400 uppercase tracking-wider font-extrabold mt-1">Pending Verifications</p>
        </div>
      </div>

      {/* 📝 NEW INTERACTIVE FAQ TROUBLESHOOTING SECTION */}
      <div className="py-12 px-4 bg-slate-50/60 dark:bg-slate-900/40 rounded-3xl max-w-4xl mx-auto border border-slate-100 dark:border-slate-800/80 transition-colors duration-200">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/40">
          
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Got stuck? Here are the most common issues faced by our campus community and how to solve them instantly.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer gap-4 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className={`text-xl text-blue-500 font-light transform transition-transform duration-200 select-none ${isOpen ? 'rotate-45 text-red-500' : ''}`}>
                    ＋
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-48 border-t border-slate-100 dark:border-slate-700/40' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/20">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}