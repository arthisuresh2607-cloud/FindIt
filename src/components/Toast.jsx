import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center p-4 space-x-3 rounded-xl shadow-2xl bg-white dark:bg-slate-800 animate-bounce max-w-sm border-l-4 border-emerald-500">
      <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
        {toast.type === 'success' ? '✓' : '⚠'}
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{toast.message}</p>
    </div>
  );
}