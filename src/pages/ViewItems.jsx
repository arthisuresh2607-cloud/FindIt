import React from 'react';

export default function ViewItems({ 
  items, 
  searchQuery, 
  setSearchQuery, 
  filterCategory, 
  setFilterCategory, 
  filterType, 
  setFilterType, 
  setSelectedItemId, 
  setCurrentPage,
  CATEGORIES 
}) {

  // Helper function to format date from YYYY-MM-DD to DD-MM-YYYY
  const formatDateDMY = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length === 3) {
      // parts[0] = YYYY, parts[1] = MM, parts[2] = DD
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  // Filter items matching the chosen tab type, drop-down category selection, and search query
  const filteredItems = items.filter(item => {
    const matchesType = filterType === "All" ? true : item.type === filterType;
    const matchesCategory = filterCategory === "" ? true : item.category === filterCategory;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (item.itemName && item.itemName.toLowerCase().includes(searchLower)) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      (item.location && item.location.toLowerCase().includes(searchLower));

    return matchesType && matchesCategory && matchesSearch;
  });

  const handleViewDetails = (id) => {
    setSelectedItemId(id);
    setCurrentPage("ItemDetails");
  };

  const handleClaimItem = (id) => {
    setSelectedItemId(id);
    setCurrentPage("ClaimItem");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Search Header Context Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div>
        </div>
      </div>

      {/* Control Filter Toolbar - Arranged cleanly with larger item proportions */}
      <div className="flex flex-wrap items-center gap-4">
        
        {/* 🛠️ MODIFIED: Expanded width to max-w-md, updated text to text-sm, and adjusted padding for larger buttons */}
        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 w-full max-w-md">
          {["All", "Lost", "Found", "Claimed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-1 text-center py-2.5 text-sm font-bold rounded-lg transition-all ${
                filterType === type
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 🛠️ MODIFIED: Expanded search bar constraint to max-w-lg, text to text-sm, and padded vertically to h-[48px] */}
        <div className="relative flex-1 min-w-[280px] max-w-lg">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 text-base">🔍</span>
          <input
            type="text"
            placeholder="Search items by name, description, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all h-[48px]"
          />
        </div>

        {/* 🛠️ MODIFIED: Adjusted category selector text scale and padding parameters to blend uniformly with the above changes */}
        <div className="w-full sm:w-52">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer h-[48px]"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid List View Output matching state array filters */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No recorded matching listings discovered in your workspace.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Image Container Block */}
              <div className="relative h-48 w-full bg-slate-50 dark:bg-slate-950/60 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                {item.image || item.imageUrl ? (
                  <img 
                    src={item.image || item.imageUrl} 
                    alt={item.itemName || "Reported item photo"} 
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-102"
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-1 text-slate-400 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0015-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="text-[10px] font-medium tracking-wide uppercase">No Image Uploaded</span>
                  </div>
                )}

                {/* Badge Type overlay */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-lg shadow-sm ${
                    item.type === "Lost" 
                      ? "bg-rose-500 text-white" 
                      : item.type === "Found" 
                      ? "bg-emerald-500 text-white" 
                      : "bg-slate-500 text-white"
                  }`}>
                    {item.type}
                  </span>
                </div>

                {/* Date formatted to DD-MM-YYYY (date-month-year) */}
                {item.date && (
                  <div className="absolute bottom-2 right-3 z-10 px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[10px] text-white/90 font-medium">
                    {formatDateDMY(item.date)}
                  </div>
                )}
              </div>

              {/* Content Description Block details area */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base line-clamp-1 text-slate-800 dark:text-slate-100">
                    {item.itemName || "Unnamed Asset"}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[2rem]">
                    {item.description || "No description overview parameter provided for this item record."}
                  </p>
                </div>

                {/* Info parameters layout row */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <span>📍</span>
                    <span className="truncate max-w-[110px]">{item.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📁</span>
                    <span className="truncate max-w-[110px]">{item.category || "N/A"}</span>
                  </div>
                </div>

                {/* Interactive Action Control Ribbon section */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="w-full text-center py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  
                  {item.status === "Claimed" ? (
                    <button
                      disabled
                      className="w-full text-center py-2 text-xs font-bold text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-not-allowed"
                    >
                      Claimed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimItem(item.id)}
                      className="w-full text-center py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow-md shadow-blue-500/20 rounded-xl transition-all cursor-pointer"
                    >
                      {item.type === "Lost" ? "I Found It" : "Claim Item"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}