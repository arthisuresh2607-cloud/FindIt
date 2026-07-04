import React from 'react';
// Import Firebase database tools and instance bridge
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Login({ setCurrentUser, showToast, setCurrentPage }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedRole = formData.get("role");
    
    const userPayload = {
      id: `user-${Date.now()}`,
      name: selectedRole === "Admin" ? "System Admin Operator" : "Generic Student Entity",
      email: formData.get("email"),
      role: selectedRole,
      createdAt: new Date().toISOString()
    };

    try {
      // Catalog logs into the cloud users ledger matching database preferences
      await addDoc(collection(db, "users"), userPayload);

      setCurrentUser({
        id: userPayload.id,
        name: userPayload.name,
        email: userPayload.email,
        role: userPayload.role
      });
      
      showToast(`Logged in successfully as ${selectedRole}`);
      setCurrentPage(selectedRole === "Admin" ? "AdminPanel" : "Home");
    } catch (error) {
      console.error("Firebase authentication logging detailed exception trace: ", error);
      showToast("Cloud connection error. Database transaction failed.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border animate-fadeIn space-y-6">
      <h2 className="text-3xl font-black text-center">Account Authentication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
          <input required type="email" name="email" defaultValue="admin@campus.edu" className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">Role</label>
          <select name="role" className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-blue-600">
            <option value="Admin">Campus Administrator / Security Staff</option>
            <option value="Student"> Student </option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm">
          LOG IN
        </button>
      </form>
    </div>
  );
}