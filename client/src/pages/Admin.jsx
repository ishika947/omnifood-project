import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaUtensils, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Admin = () => {
  // 1. Staff Data (Dummy Data for Viva Presentation)
  const [staff, setStaff] = useState([
    { id: 1, name: "Ramesh Kumar", role: "Head Chef", shift: "Morning (9AM - 5PM)", status: "Active", inTime: "08:55 AM" },
    { id: 2, name: "Suresh Singh", role: "Waiter", shift: "Evening (4PM - 11PM)", status: "Late", inTime: "04:15 PM" },
    { id: 3, name: "Priya Sharma", role: "Manager", shift: "Full Day", status: "Active", inTime: "09:00 AM" },
    { id: 4, name: "Rahul Verma", role: "Waiter", shift: "Evening", status: "On Leave", inTime: "--" },
  ]);

  // 2. Live Orders Data (Customer Orders)
  const [orders, setOrders] = useState([
    { id: 101, table: "Table 4", item: "Paneer Tikka Pizza", time: "10 mins ago", status: "Preparing" },
    { id: 102, table: "Table 1", item: "Maharaja Burger", time: "2 mins ago", status: "Pending" },
  ]);

  // Logic to update Order Status
  const updateStatus = (id) => {
    setOrders(orders.map(order => 
      order.id === id 
      ? { ...order, status: order.status === "Pending" ? "Preparing" : "Ready to Serve" } 
      : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🛠️ Admin & Staff Dashboard</h1>

      {/* SECTION 1: QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500">Total Staff</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500">Present Today</h3>
          <p className="text-3xl font-bold">10</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <h3 className="text-gray-500">Late/Leave</h3>
          <p className="text-3xl font-bold">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <h3 className="text-gray-500">Active Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION 2: STAFF ATTENDANCE & SHIFTS */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaUserTie/> Staff Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">In-Time</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((person) => (
                  <tr key={person.id} className="border-b">
                    <td className="p-3 font-medium">{person.name}</td>
                    <td className="p-3 text-sm text-gray-500">{person.role}</td>
                    <td className="p-3">{person.inTime}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold 
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

        {/* SECTION 3: KITCHEN ORDER DISPLAY (KOT) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaUtensils/> Kitchen Orders (Live)</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div 
                key={order.id} 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="border p-4 rounded-lg flex justify-between items-center bg-gray-50"
              >
                <div>
                  <h4 className="font-bold text-lg">{order.table}</h4>
                  <p className="text-gray-600">{order.item}</p>
                  <p className="text-xs text-orange-500 flex items-center gap-1"><FaClock/> Ordered: {order.time}</p>
                </div>
                
                <div className="text-right">
                  <span className={`block mb-2 text-sm font-bold ${
                    order.status === 'Pending' ? 'text-red-500' : 
                    order.status === 'Preparing' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {order.status}
                  </span>
                  
                  {/* Button to change status */}
                  {order.status !== 'Ready to Serve' && (
                    <button 
                      onClick={() => updateStatus(order.id)}
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                    >
                      {order.status === 'Pending' ? 'Start Cooking' : 'Mark Ready'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 4: TODAY'S SPECIAL MANAGER */}
      <div className="mt-8 bg-gray-800 text-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">🎉 Today's Special Offer</h2>
            <p className="text-gray-400">Control what users see on the Menu page.</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-bold">
            Update Offer
          </button>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="bg-gray-700 p-3 rounded-lg border border-orange-500">
            <h4 className="font-bold text-orange-400">Current Deal:</h4>
            <p>Paneer Tikka Pizza @ ₹399 (was ₹450)</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Admin;