import React, { useState, useEffect } from 'react';
// Import Firebase database tools and instance bridge
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Component Imports
// Component Imports
import Login from './pages/Login';
import ReportItem from './pages/ReportItem';
import ViewItems from './pages/ViewItems';
export default function App() {
  // Global States
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);

  // Constants
  const CATEGORIES = ["Electronics", "Documents", "Books", "Clothing", "Keys", "Others"];
  const LOCATIONS = ["Main Library", "Science Block Auditorium", "Student Center Cafeteria", "Sports Complex", "North Hostel Ground", "Others"];

  // Helper Toast Notification Engine
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Helper System Ledger Logger
  const dispatchNotification = (message, type = "system") => {
    const newLog = {
      id: `log-${Date.now()}`,
      text: message,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [newLog, ...prev]);
  };

  // Synchronize initial listings state from Cloud Firestore items collection
  useEffect(() => {
    const fetchInitialCloudData = async () => {
      try {
        const queryConstraints = query(
          collection(db, "items"), 
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(queryConstraints);
        
        const initialRecords = [];
        snapshot.forEach((doc) => {
          initialRecords.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setItems(initialRecords);
      } catch (error) {
        console.error("Error establishing cloud connection pipeline initialization: ", error);
        showToast("Unable to synchronize offline changes with Firestore backend.", "error");
      }
    };

    fetchInitialCloudData();
  }, []);

  // Simple Router Control Flow
  const renderPage = () => {
    switch (currentPage) {
      case "Login":
        return (
          <Login 
            setCurrentUser={setCurrentUser} 
            showToast={showToast} 
            setCurrentPage={setCurrentPage} 
          />
        );
      case "ReportItem":
        return (
          <ReportItem 
            currentUser={currentUser} 
            setItems={setItems} 
            dispatchNotification={dispatchNotification} 
            showToast={showToast} 
            setCurrentPage={setCurrentPage}
            CATEGORIES={CATEGORIES}
            LOCATIONS={LOCATIONS}
          />
        );
      case "ViewItems":
      case "Home":
      default:
        return (
          <ViewItems 
            items={items}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterType={filterType}
            setFilterType={setFilterType}
            setSelectedItemId={setSelectedItemId}
            setCurrentPage={setCurrentPage}
            CATEGORIES={CATEGORIES}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-200">
      {/* Toast Render Window */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-2xl font-bold border text-sm transition-all animate-slideIn ${
          toast.type === 'error' 
            ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-400' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-400'
        }`}>
          {toast.type === 'error' ? '⚠️ ' : '✅ '} {toast.message}
        </div>
      )}

      {/* Global Application Hub Banner Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage("Home")}>
            <span className="text-2xl">🔍</span>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">FindIt</span>
          </div>

          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage("Home")} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentPage === 'Home' || currentPage === 'ViewItems' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'}`}
            >
              Browse Registry
            </button>
            <button 
              onClick={() => {
                if (!currentUser) {
                  showToast("Authentication required before cataloging entries.", "error");
                  setCurrentPage("Login");
                } else {
                  setCurrentPage("ReportItem");
                }
              }} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentPage === 'ReportItem' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'}`}
            >
              Report Asset
            </button>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

            {currentUser ? (
              <div className="flex items-center space-x-3 pl-1">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black leading-tight text-slate-800 dark:text-slate-200">{currentUser.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{currentUser.role}</p>
                </div>
                <button onClick={() => { setCurrentUser(null); showToast("Session ended successfully."); setCurrentPage("Home"); }} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-all" title="Sign Out">
                  🚪
                </button>
              </div>
            ) : (
              <button onClick={() => setCurrentPage("Login")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all">
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Framework Content Container Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}