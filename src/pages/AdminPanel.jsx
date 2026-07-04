import React from 'react';

export default function AdminPanel({ claims, setClaims, items, setItems, dispatchNotification, showToast }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl border shadow-xl p-6 overflow-x-auto">
        <h3 className="font-extrabold text-lg mb-4 flex items-center space-x-2">
          <span>📋 Active System Claim Pipeline Queue</span>
        </h3>
        
        {claims.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No validation records inside system frame.</p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase">
                <th className="pb-3">Target Asset</th>
                <th className="pb-3">Claimant Entity</th>
                <th className="pb-3">Proof Details</th>
                <th className="pb-3">State Status</th>
                <th className="pb-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {claims.map((claim) => {
                const associatedItem = items.find(i => i.id === claim.itemId);
                return (
                  <tr key={claim.id}>
                    <td className="py-4 font-bold">{associatedItem?.itemName || "Deleted Linked Link"}</td>
                    <td className="py-4">{claim.contactInfo}</td>
                    <td className="py-4 max-w-xs truncate">{claim.proofDescription}</td>
                    <td className="py-4"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700">{claim.status}</span></td>
                    <td className="py-4 text-right space-x-1 whitespace-nowrap">
                      {claim.status === "Pending" && (
                        <>
                          <button onClick={() => {
                            setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, status: "Approved" } : c));
                            setItems(prev => prev.map(i => i.id === claim.itemId ? { ...i, status: "Claimed" } : i));
                            showToast("Claim officially approved.");
                          }} className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg">Approve</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}