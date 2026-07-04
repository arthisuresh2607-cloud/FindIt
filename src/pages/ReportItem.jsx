import React, { useState } from 'react';

export default function ReportItem({ currentUser, setItems, dispatchNotification, showToast, setCurrentPage, CATEGORIES, LOCATIONS }) {
  const [activeTab, setActiveTab] = useState("Lost");
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Track inputs to determine conditional "Other" view state visibility
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0] || "");
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0] || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fallbackUrl = "https://images.unsplash.com/photo-1532187863486-abf9d39d6618?w=500&q=80";

   const processSubmission = (base64ImageUrl) => {
  // 🛠️ FIX: Read directly from your React state instead of formData for the dropdowns
  const finalCategory = selectedCategory === "Others" ? formData.get("customCategory") : selectedCategory;
  const finalLocation = selectedLocation === "Others" ? formData.get("customLocation") : selectedLocation;

  const newItem = {
    id: `item-${Date.now()}`,
    reporterId: currentUser?.id || "anonymous",
    type: activeTab,
    itemName: formData.get("itemName"),
    category: finalCategory, // Will now contain the correct value!
    description: formData.get("description"),
    location: finalLocation, // Will now contain the correct value!
    date: formData.get("date"),
        // 🛠️ FIX: Map to both property fields so ViewItems.jsx can read it cleanly
        image: base64ImageUrl, 
        imageUrl: base64ImageUrl,
        status: "Active",
        contactInfo: formData.get("contactInfo"),
        createdAt: new Date().toISOString()
      };

      if (!newItem.itemName || !newItem.category || !newItem.location || !newItem.date) {
        showToast("Please fill out required core fields.", "error");
        return;
      }

      setItems(prev => [newItem, ...prev]);
      dispatchNotification(`New ${activeTab} item cataloged: ${newItem.itemName}`, "system");
      showToast("Asset Successfully Logged in System Engine!");
      setCurrentPage("ViewItems");
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        processSubmission(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      processSubmission(fallbackUrl);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">Report Asset Parameters</h2>
      
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl mb-6">
        <button type="button" onClick={() => setActiveTab("Lost")} className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all ${activeTab === 'Lost' ? 'bg-white dark:bg-slate-800 text-rose-600 shadow-sm' : 'text-slate-500'}`}> Report Lost Item</button>
        <button type="button" onClick={() => setActiveTab("Found")} className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all ${activeTab === 'Found' ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' : 'text-slate-500'}`}> Report Found Item</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Item Name *</label>
          <input required type="text" name="itemName" placeholder="e.g. Red iPhone 13 Pro Max" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Category *</label>
            <select 
              required 
              name="category" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Campus Location *</label>
            <select 
              required 
              name="location" 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
            >
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>

        {/* CONDITIONAL CONDENSED CUSTOM ENTRY INPUTS ROW */}
        {(selectedCategory === "Others" || selectedLocation === "Others") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl animate-fadeIn">
            {selectedCategory === "Others" && (
              <div>
                <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">Specify the Category *</label>
                <input required type="text" name="customCategory" placeholder="e.g., Musical Instrument" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            {selectedLocation === "Others" && (
              <div>
                <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">Specify the Location *</label>
                <input required type="text" name="customLocation" placeholder="e.g., Near Main Water Tank" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Incident Date *</label>
            <input required type="date" name="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Upload Asset Image *</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 h-[46px] overflow-hidden">
              <label className="cursor-pointer flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="truncate max-w-[150px]">
                  {selectedFile ? selectedFile.name : "Choose local image file..."}
                </span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Browse
                </span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Contact Verification email *</label>
          <input required type="email" name="contactInfo" defaultValue={currentUser?.email || ""} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Asset Description *</label>
          <textarea required name="description" rows={3} placeholder="Provide specific distinct attributes..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"></textarea>
        </div>
        <button type="submit" className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg text-sm ${activeTab === 'Lost' ? 'bg-gradient-to-r from-rose-600 to-amber-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600'}`}>
          Submit
        </button>
      </form>
    </div>
  );
}