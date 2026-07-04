import React from 'react';

export default function ClaimItem({ selectedItemId, items, currentUser, setClaims, setItems, dispatchNotification, showToast, setCurrentPage }) {
  const item = items.find(i => i.id === selectedItemId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClaim = {
      id: `claim-${Date.now()}`,
      itemId: selectedItemId,
      claimantId: currentUser?.id || "anonymous-student",
      proofDescription: formData.get("proof"),
      contactInfo: formData.get("contact"),
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    setClaims(prev => [newClaim, ...prev]);
    setItems(prev => prev.map(i => i.id === selectedItemId ? { ...i, status: "Claim Requested" } : i));
    dispatchNotification(`New Claim request incoming for asset: ${item?.itemName}`, "admin");
    showToast("Verification claims transmitted successfully!");
    setCurrentPage("ViewItems");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl border animate-fadeIn">
      <h2 className="text-2xl font-black mb-1">Ownership Validation Request</h2>
      <p className="text-xs text-slate-400 mb-6">Provide parameters to authenticate system property matching.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Campus Identification Number (Roll / ID)</label>
          <input required type="text" placeholder="e.g. CS/2023/045" className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Infallible Structural Proof Description *</label>
          <textarea required name="proof" rows={4} placeholder="Describe unique features or identifier configurations..." className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200"></textarea>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Active Call Back Contact Info *</label>
          <input required type="email" name="contact" defaultValue={currentUser?.email || ""} className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200" />
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm">
          Transmit Verification Claims Payload 🚀
        </button>
      </form>
    </div>
  );
}