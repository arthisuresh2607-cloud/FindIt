import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

// Component Imports
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ViewItems from './pages/ViewItems';
import ItemDetails from './pages/ItemDetails';
import ReportItem from './pages/ReportItem';
import ClaimItem from './pages/ClaimItem';
import AdminPanel from './pages/AdminPanel';
import ContactOwner from './pages/ContactOwner';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Contact from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);

  const CATEGORIES = ["Electronics", "Documents", "Books", "Clothing", "Keys", "Bags", "Others"];
  const LOCATIONS = ["Library", "Main Cafeteria", "Science Block", "Engineering Building", "Sports Complex", "Student Center", "Auditorium"];

  // Real-time synchronization of Items collection
  useEffect(() => {
    const unsubscribeItems = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsList);
    }, (error) => console.error("Error syncing items:", error));

    return () => unsubscribeItems();
  }, []);

  // Real-time synchronization of Claims collection
  useEffect(() => {
    const unsubscribeClaims = onSnapshot(collection(db, "claims"), (snapshot) => {
      const claimsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClaims(claimsList);
    }, (error) => console.error("Error syncing claims:", error));

    return () => unsubscribeClaims();
  }, []);

  const showToast = (message, type = "success") => {
    console.log(`[Toast - ${type.toUpperCase()}]: ${message}`);
  };

  const dispatchNotification = (notification) => {
    console.log("[Notification dispatched]:", notification);
  };

  const stats = {
    totalItems: items.length,
    lostItems: items.filter(i => i.type === "Lost").length,
    foundItems: items.filter(i => i.type === "Found").length,
    claimedItems: items.filter(i => i.status === "Claimed").length
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Login":
        return <Login setCurrentUser={setCurrentUser} showToast={showToast} setCurrentPage={setCurrentPage} />;
      case "AdminPanel":
        return <AdminPanel claims={claims} setClaims={setClaims} items={items} setItems={setItems} dispatchNotification={dispatchNotification} showToast={showToast} />;
      case "ReportItem":
        return <ReportItem currentUser={currentUser} setItems={setItems} dispatchNotification={dispatchNotification} showToast={showToast} setCurrentPage={setCurrentPage} CATEGORIES={CATEGORIES} LOCATIONS={LOCATIONS} />;
      case "ClaimItem":
        return <ClaimItem selectedItemId={selectedItemId} items={items} currentUser={currentUser} setClaims={setClaims} setItems={setItems} dispatchNotification={dispatchNotification} showToast={showToast} setCurrentPage={setCurrentPage} />;
      case "ItemDetails":
        return <ItemDetails selectedItemId={selectedItemId} items={items} setCurrentPage={setCurrentPage} currentUser={currentUser} showToast={showToast} />;
      case "ContactOwner":
        return <ContactOwner selectedItemId={selectedItemId} currentUser={currentUser} showToast={showToast} />;
      case "Leaderboard":
        return <Leaderboard />;
      case "Contact":
        return <Contact />;
      case "ViewItems":
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
      case "Home":
      default:
        return <Home stats={stats} setCurrentPage={setCurrentPage} setSearchQuery={setSearchQuery} setFilterCategory={setFilterCategory} setFilterType={setFilterType} CATEGORIES={CATEGORIES} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setCurrentPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}