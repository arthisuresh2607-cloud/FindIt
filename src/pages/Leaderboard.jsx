import React from 'react';

export default function Leaderboard() {
  // Database list of top active finders on campus
  const contributors = [
    { id: 1, name: "Arun Kumar", returns: 14, major: "Computer Science" },
    { id: 2, name: "Priya", returns: 9, major: "Information Technology" },
    { id: 3, name: "Rahul", returns: 6, major: "Interior Design" },
    { id: 4, name: "Sneha", returns: 3, major: "Electrical and Communication" },
    { id: 5, name: "Vikram", returns: 2, major: "Mechanical" },
  ];

  // Helper method to resolve gamification tiers dynamically based on return thresholds
  const getBadgeDetails = (returnsCount) => {
    if (returnsCount >= 10) {
      return { label: "Campus Hero", icon: "🥇", style: "bg-amber-500 text-white shadow-amber-500/20" };
    }
    if (returnsCount >= 5) {
      return { label: "Trusted Finder", icon: "🥈", style: "bg-slate-400 text-white shadow-slate-400/20" };
    }
    return { label: "Helper", icon: "🥉", style: "bg-orange-500 text-white shadow-orange-500/20" };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Informative Dashboard Heading Hero Block */}
      <div className="text-center space-y-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-lg shadow-blue-500/10">
        <span className="text-2xl animate-bounce inline-block">✨ ⭐ ✨</span>
        <h2 className="text-2xl font-black tracking-tight">FindIt Integrity Leaderboard</h2>
        <p className="text-xs text-blue-100 max-w-md mx-auto leading-relaxed">
          Celebrating the top daily heroes who securely logged and successfully re-connected missing assets back to their classmates.
        </p>
      </div>

      {/* Tier Badge Reference Legend Grid Layout Section */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { title: "Campus Hero", limit: "10+ Returns", icon: "🥇", color: "border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400" },
          { title: "Trusted Finder", limit: "5-9 Returns", icon: "🥈", color: "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/20 text-slate-700 dark:text-slate-400" },
          { title: "Helper", limit: "1-4 Returns", icon: "🥉", color: "border-orange-200 dark:border-orange-900/40 bg-orange-50/60 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400" }
        ].map((tier, index) => (
          <div key={index} className={`p-3 rounded-xl border text-center space-y-0.5 shadow-xs transition-transform hover:scale-102 duration-200 ${tier.color}`}>
            <span className="text-lg block">{tier.icon}</span>
            <div className="text-[11px] font-black tracking-tight">{tier.title}</div>
            <div className="text-[9px] font-bold opacity-75">{tier.limit}</div>
          </div>
        ))}
      </div>

      {/* Main Leaderboard Rankings List Stack Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Contributor Rank</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Returns</span>
        </div>

        <div className="divide-y divide-slate-50 dark:divide-slate-800/60">
          {contributors.map((user, idx) => {
            const badge = getBadgeDetails(user.returns);
            const rankPosition = idx + 1;

            return (
              <div 
                key={user.id} 
                className="p-4 flex items-center justify-between hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all duration-150"
              >
                {/* Left Segment: Position Index Number, Profile Identity details */}
                <div className="flex items-center space-x-6">
                  <span className={`w-6 text-center text-xs font-black ${
                    rankPosition === 1 ? "text-amber-500 text-sm" : rankPosition === 2 ? "text-slate-400 text-sm" : "text-slate-400"
                  }`}>
                    #{rankPosition}
                  </span>
                  
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold tracking-wide">
                      {user.major}
                    </div>
                  </div>
                </div>

                {/* Right Segment: Badge Label Pill Indicators, Raw Return Tally Counter */}
                <div className="flex items-center space-x-4">
                  <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs ${badge.style}`}>
                    <span>{badge.icon}</span> {badge.label}
                  </span>
                  <span className="w-8 text-right font-black text-sm text-slate-700 dark:text-slate-300">
                    {user.returns}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}