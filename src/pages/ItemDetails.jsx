import React from 'react';

export default function ItemDetails({ 
  selectedItemId, 
  items, 
  setCurrentPage, 
  currentUser, 
  showToast 
}) {
  // Locate the target active item
  const item = items.find(i => i.id === selectedItemId);

  // Fallback if item isn't resolved gracefully
  if (!item) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Asset specifications could not be retrieved.</p>
        <button 
          onClick={() => setCurrentPage("ViewItems")} 
          className="mt-4 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl"
        >
          Return to Search Feed
        </button>
      </div>
    );
  }

  const handleClaimNavigation = () => {
    setCurrentPage("ClaimItem");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden animate-fadeIn">
      
      {/* 1. TOP SECTION: Balanced, Normal-Sized Image Container */}
      <div className="relative w-full h-64 sm:h-80 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        {item.image || item.imageUrl ? (
          <img 
            src={item.image || item.imageUrl} 
            alt={item.itemName || "Asset overview source rendering"} 
            className="w-full h-full object-contain p-2" // object-contain stops it from blowing up or stretching artificially
          />
        ) : (
          <div className="flex flex-col items-center space-y-2 text-slate-400 select-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 opacity-60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0015-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-xs font-bold tracking-wider uppercase">No Reference Image Attached</span>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-xl shadow-md ${
            item.type === "Lost" ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
          }`}>
            {item.type}
          </span>
          <span className="px-3 py-1 text-[10px] font-black tracking-wider uppercase bg-blue-500 text-white rounded-xl shadow-md">
            {item.category}
          </span>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: Clean Information Parameters Stack */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Title and Top Right Decorator */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              {item.itemName || "Unnamed Parameter"}
            </h1>
            <p className="text-xs text-slate-400 font-semibold tracking-wide">
              ID Tag Reference: {item.id}
            </p>
          </div>
          
          {/* Status Label Pill */}
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
            item.status === "Active" 
              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" 
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          }`}>
            ● {item.status || "Active"}
          </span>
        </div>

        {/* Meta Info Pill Blocks */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/60">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Reported Location</span>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>📍</span> {item.location || "Unspecified Location"}
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/60">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Incident Date</span>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>📅</span> {item.date || "N/A"}
            </div>
          </div>
        </div>

        {/* Text Description Box */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Description</h4>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {item.description || "No specific detailed descriptions supplied for this logged asset array entry."}
          </div>
        </div>

        {/* Secondary Contact Info Metadata Segment */}
        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 space-y-1">
          <h4 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Contact Verification Anchor</h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
            {item.contactInfo || "No email anchor point provided."}
          </p>
        </div>

        {/* Footer Navigation Buttons Row */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setCurrentPage("ViewItems")}
            className="flex-1 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer text-center"
          >
            ← Back to Feed
          </button>

          {item.status !== "Claimed" && (
            <button
              onClick={handleClaimNavigation}
              className={`flex-1 py-3 text-xs font-bold text-white rounded-xl transition-all shadow-md cursor-pointer text-center ${
                item.type === "Lost" 
                  ? "bg-gradient-to-r from-rose-600 to-orange-600 hover:opacity-95 shadow-rose-500/10" 
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 shadow-emerald-500/10"
              }`}
            >
              {item.type === "Lost" ? "I Found This Asset" : "Claim This Asset"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}