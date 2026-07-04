import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ReportItem({ currentUser, showToast, setCurrentPage, CATEGORIES, LOCATIONS }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [itemType, setItemType] = useState("Lost");
  const [dateInput, setDateInput] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !category || !location || !dateInput) {
      showToast("Please fulfill all essential metadata form inputs.", "error");
      return;
    }

    const newItemPayload = {
      itemName,
      description,
      location,
      category,
      type: itemType,
      date: dateInput,
      image: imageBase64 || null,
      status: "Active",
      reportedBy: currentUser?.email || "Anonymous",
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "items"), newItemPayload);
      showToast("Success! Your listing has been published to the cloud.", "success");
      setCurrentPage("ViewItems");
    } catch (error) {
      console.error("Firebase write error:", error);
      showToast("Failed to safely register your item parameters online.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h2 className="text-xl font-black mb-6">Report Missing or Found Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Asset Title</label>
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Matte Black Water Bottle" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Report Context</label>
            <select value={itemType} onChange={(e) => setItemType(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm outline-none">
              <option value="Lost" className="dark:bg-slate-900">I Lost This Item</option>
              <option value="Found" className="dark:bg-slate-900">I Found This Item</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm outline-none">
              <option value="" className="dark:bg-slate-900">Select Category</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat} className="dark:bg-slate-900">{cat}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Campus Hotspot</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm outline-none">
              <option value="" className="dark:bg-slate-900">Select Location</option>
              {LOCATIONS.map(loc => <option key={loc} value={loc} className="dark:bg-slate-900">{loc}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Event Date</label>
            <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Detailed Description Overview</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Provide distinct characteristics (stickers, scratches, brand variants)..."></textarea>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Reference Snapshot Attachment</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-800 dark:file:text-blue-400 cursor-pointer" />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer">
          Publish Listing Records
        </button>
      </form>
    </div>
  );
}