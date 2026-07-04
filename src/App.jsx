import React, { useState, useEffect, useMemo } from 'react';
// 🛠️ Updated path to find the file inside pages/context/ as per image_8872c1.png
import { ThemeProvider, useTheme } from "./pages/context/ThemeContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import ViewItems from './pages/ViewItems';
import ItemDetails from './pages/ItemDetails';
import ClaimItem from './pages/ClaimItem';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import ContactOwner from './pages/ContactOwner';
// 🛠️ IMPORT YOUR NEW LEADERBOARD COMPONENT HERE
import Leaderboard from './pages/Leaderboard';

const CATEGORIES = ["Electronics", "Documents/IDs", "Books/Notebooks", "Clothing", "Keys", "Bags/Wallets", "Others"];
const LOCATIONS = ["A halls", "M halls", "B halls", "Library", "Food court", "Others"];
const INITIAL_ITEMS = [];

function MainLayoutContainer() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("findit_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("findit_items");
    if (saved) {
      const parsed = JSON.parse(saved);
      const containsMockData = parsed.some(item => item.id === "item-1" || item.id === "item-2" || item.itemName === "MacBook Pro 14");
      if (containsMockData) {
        localStorage.setItem("findit_items", JSON.stringify([]));
        return INITIAL_ITEMS;
      }
      return parsed;
    }
    return INITIAL_ITEMS;
  });

  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem("findit_claims");
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("findit_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("findit_user", currentUser ? JSON.stringify(currentUser) : "");
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("findit_items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("findit_claims", JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem("findit_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const dispatchNotification = (text, type = "system") => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      text,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const stats = useMemo(() => {
    return {
      totalLost: items.filter(i => i.type === "Lost" && i.status !== "Claimed").length,
      totalFound: items.filter(i => i.type === "Found" && i.status !== "Claimed").length,
      totalClaimed: items.filter(i => i.status === "Claimed").length,
      pendingClaims: claims.filter(c => c.status === "Pending").length
    };
  }, [items, claims]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        notifications={notifications} 
        setNotifications={setNotifications} 
        showToast={showToast} 
      />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === "Home" && <Home stats={stats} setCurrentPage={setCurrentPage} setSearchQuery={setSearchQuery} setFilterCategory={setFilterCategory} setFilterType={setFilterType} CATEGORIES={CATEGORIES} />}
        {currentPage === "Report" && <ReportItem currentUser={currentUser} setItems={setItems} dispatchNotification={dispatchNotification} showToast={showToast} setCurrentPage={setCurrentPage} CATEGORIES={CATEGORIES} LOCATIONS={LOCATIONS} />}
        {currentPage === "ViewItems" && <ViewItems items={items} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterCategory={filterCategory} setFilterCategory={setFilterCategory} filterType={filterType} setFilterType={setFilterType} setSelectedItemId={setSelectedItemId} setCurrentPage={setCurrentPage} CATEGORIES={CATEGORIES} />}
        {currentPage === "ItemDetails" && <ItemDetails selectedItemId={selectedItemId} items={items} setCurrentPage={setCurrentPage} setSelectedItemId={setSelectedItemId} />}
        {currentPage === "ClaimItem" && <ClaimItem selectedItemId={selectedItemId} items={items} currentUser={currentUser} setClaims={setClaims} setItems={setItems} dispatchNotification={dispatchNotification} showToast={showToast} setCurrentPage={setCurrentPage} />}
        {currentPage === "AdminPanel" && <AdminPanel claims={claims} setClaims={setClaims} items={items} setItems={setItems} showToast={showToast} />}
        {currentPage === "Login" && <Login setCurrentUser={setCurrentUser} showToast={showToast} setCurrentPage={setCurrentPage} />}
        {currentPage === "About" && <About />}
        {currentPage === "Contact" && <Contact />}
        {currentPage === "ContactOwner" && <ContactOwner selectedItemId={selectedItemId} currentUser={currentUser} showToast={showToast} />}
        
        {/* 🛠️ NEW ADDITION: LEADERBOARD RENDER RULE */}
        {currentPage === "Leaderboard" && <Leaderboard />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayoutContainer />
    </ThemeProvider>
  );
}