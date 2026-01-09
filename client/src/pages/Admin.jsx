import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserTie, FaUtensils, FaClock, FaCheckCircle, FaSignOutAlt, FaChartLine } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // --- 1. SECURITY & AUTHENTICATION CHECK ---
  useEffect(() => {
    // Check if user is saved in Local Storage
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      // If no user found, redirect to Login Page immediately
      navigate("/login");
    } else {
      // If user found, save to state to display name
      setCurrentUser(user);
    }
  }, [navigate]);

  // --- 2. LOGOUT FUNCTION ---
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session
    navigate("/login"); // Go to Login
  };

  // --- 3. DASHBOARD DATA (Simulated for Viva) ---
  
  // Staff Data
  const [staff] = useState([
    { id: 1, name: "Ramesh Kumar", role: "Head Chef", shift: "Morning", status: "Active", inTime: "08:55 AM" },
    { id: 2, name: "Suresh Singh", role: "Waiter", shift: "Evening", status: "Late", inTime: "04:15 PM" },
    { id: 3, name: "Priya Sharma", role: "Manager", shift: "Full Day", status: "Active", inTime: "09:00 AM" },
    { id: 4, name: "Rahul Verma", role: "Waiter", shift: "Evening", status: "On Leave", inTime: "--" },
  ]);

  // Live Orders Data
  const [orders, setOrders] = useState([
    { id: 101, table: "Table 4", item: "Paneer Tikka Pizza", time: "10 mins ago", status: "Preparing" },
    { id: 102, table: "Table 1", item: "Maharaja Burger", time: "2 mins ago", status: "Pending" },
    { id: 103, table: "Table 2", item: "Choco Lava Cake", time: "Just now", status: "Pending" },
  ]);

  // Logic to update Order Status (Interactive Feature)
  const updateStatus = (id) => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        if (order.status === "Pending") return { ...order, status: "Preparing" };
        if (order.status === "Preparing") return { ...order, status: "Ready to Serve" };
      }
      return order;
    }));
  };

  // Prevent rendering if not logged in
  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaChartLine className="text-orange-600"/> Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, <span className="font-bold text-orange-600 text-lg">{currentUser.name}</span> 
            <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2 uppercase">{currentUser.role}</span>
          </p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="mt-4 md:mt-0 bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Total Staff</h3>
          <p className="text-3xl font-bold text-gray-800">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Present Today</h3>
          <p className="text-3xl font-bold text-gray-800">10</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Late / Leave</h3>
          <p className="text-3xl font-bold text-gray-800">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Active Orders</h3>
          <p className="text-3xl font-bold text-gray-800">{orders.filter(o => o.status !== 'Ready to Serve').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MODULE 1: STAFF ATTENDANCE TABLE */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700">
            <FaUserTie className="text-blue-600"/> Staff Attendance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">In-Time</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((person) => (
                  <tr key={person.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold text-gray-700">{person.name}</td>
                    <td className="p-3 text-sm text-gray-500">{person.role}</td>
                    <td className="p-3 font-mono text-sm">{person.inTime}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold 
                        ${person.status === 'Active' ? 'bg-green-100 text-green-700' : 
                          person.status === 'Late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {person.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODULE 2: LIVE KITCHEN ORDERS (KDS) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700">
            <FaUtensils className="text-orange-600"/> Live Kitchen Orders
          </h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {orders.map((order) => (
              <motion.div 
                key={order.id} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className={`border p-4 rounded-lg flex justify-between items-center 
                  ${order.status === 'Ready to Serve' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}
              >
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{order.table}</h4>
                  <p className="text-gray-600 font-medium">{order.item}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <FaClock/> {order.time}
                  </p>
                </div>
                
                <div className="text-right flex flex-col items-end gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider 
                    ${order.status === 'Pending' ? 'text-red-500' : 
                    order.status === 'Preparing' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {order.status}
                  </span>
                  
                  {/* Action Button */}
                  {order.status !== 'Ready to Serve' ? (
                    <button 
                      onClick={() => updateStatus(order.id)}
                      className={`text-xs px-4 py-2 rounded font-bold text-white transition shadow-md
                        ${order.status === 'Pending' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {order.status === 'Pending' ? 'Start Cooking' : 'Mark Ready'}
                    </button>
                  ) : (
                    <div className="text-green-600 text-xl"><FaCheckCircle /></div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {orders.length === 0 && (
              <p className="text-center text-gray-400 py-10">No active orders right now.</p>
            )}
          </div>
        </div>

      </div>

      {/* MODULE 3: MANAGER CONTROLS */}
      <div className="mt-8 bg-gray-900 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">🎉 Manager's Control Panel</h2>
            <p className="text-gray-400 mt-1">Update "Today's Special" on the main Menu page directly from here.</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-lg font-bold shadow-lg transform hover:scale-105 transition">
            Set New Offer
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 inline-block">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Active Offer</p>
          <p className="text-lg font-mono text-orange-400">Paneer Tikka Pizza @ ₹399</p>
        </div>
      </div>

    </div>
  );
};

export default Admin;