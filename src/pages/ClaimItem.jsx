import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

export default function ClaimItem({ selectedItemId, items, currentUser, showToast, setCurrentPage }) {
  const [contactDetails, setContactDetails] = useState("");
  const [proof, setProof] = useState("");

  const targetItem = items.find(item => item.id === selectedItemId);

  if (!targetItem) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-400">Target listing parameters missing or unverified.</p>
      </div>
    );
  }

  const handleConfirmClaim = async (e) => {
    e.preventDefault();
    if (!contactDetails || !proof) {
      showToast("Please provide documentation parameters.", "error");
      return;
    }

    const claimPayload = {
      itemId: selectedItemId,
      itemTitle: targetItem.itemName || "Asset Item",
      claimedBy: currentUser?.name || "Student",
      claimantEmail: currentUser?.email || "anonymous@campus.edu",
      contactInfo: contactDetails,
      proofDetails: proof,
      status: "Pending Verification",
      timestamp: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "claims"), claimPayload);
      const itemRef = doc(db, "items", selectedItemId);
      await updateDoc(itemRef, { status: "Claimed" });

      showToast("Claim document logs successfully saved online!", "success");
      setCurrentPage("ViewItems");
    } catch (error) {
      console.error("Firebase transaction execution failed:", error);
      showToast("Database rejected requested claims submission.", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h2 className="text-xl font-black mb-1">Verify Asset Claim</h2>
      <p className="text-xs text-slate-500 mb-6">Filing for validation on: <span className="font-bold text-slate-800 dark:text-slate-200">{targetItem.itemName}</span></p>
      
      <form onSubmit={handleConfirmClaim} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Contact Delivery Channel</label>
          <input type="text" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Phone link or alternative communication line" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Validation & Ownership Proof Parameters</label>
          <textarea value={proof} onChange={(e) => setProof(e.target.value)} rows="4" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Describe specialized elements, lock combinations, purchase dates, or key features..."></textarea>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => setCurrentPage("ViewItems")} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-xs font-bold rounded-xl transition-all cursor-pointer">Cancel</button>
          <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer">Submit Validation File</button>
        </div>
      </form>
    </div>
  );
}