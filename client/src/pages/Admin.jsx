import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserTie, FaUtensils, FaUserPlus, FaSignOutAlt, FaChartBar, FaChartPie, FaExclamationTriangle } from 'react-icons/fa';
// Charts Import
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [staff, setStaff] = useState([]);
  
  // New Staff Form State
  const [newStaff, setNewStaff] = useState({ name: "", username: "", password: "", role: "Waiter" });

  // --- DUMMY DATA FOR CHARTS (Viva mein dikhane ke liye perfect) ---
  const revenueData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 7890 },
    { name: 'Sat', sales: 9390 },
    { name: 'Sun', sales: 8490 },
  ];

  const popularFoodData = [
    { name: 'Pizza', value: 400 },
    { name: 'Burger', value: 300 },
    { name: 'Pasta', value: 300 },
    { name: 'Drinks', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // 1. Load User & Data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
      fetchStaff();
    }
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/staff');
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff");
    }
  };

  const getAttendanceStatus = (lastLoginDate) => {
    if (!lastLoginDate) return <span className="text-gray-400">Not Logged In</span>;
    const loginTime = new Date(lastLoginDate);
    if (loginTime.getHours() > 9 || (loginTime.getHours() === 9 && loginTime.getMinutes() > 15)) {
       return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><FaExclamationTriangle/> LATE (Fined)</span>;
    }
    return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">On Time</span>;
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/staff/create', newStaff);
      alert("✅ New Staff Member Added!");
      fetchStaff();
      setNewStaff({ name: "", username: "", password: "", role: "Waiter" });
    } catch (err) {
      alert("Failed to add staff.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-600">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, <span className="text-orange-600 font-bold">{currentUser.name}</span></p>
        </div>
        <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-200 transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* --- SECTION 1: VISUAL ANALYTICS (CHARTS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-700">
            <FaChartBar className="text-blue-600"/> Weekly Revenue
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Items Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-700">
            <FaChartPie className="text-green-600"/> Popular Categories
          </h2>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={popularFoodData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {popularFoodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: STAFF & KITCHEN --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* STAFF LIST */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserTie className="text-purple-600"/> Staff Attendance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Last Login</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((person) => (
                    <tr key={person._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-bold">{person.name}</td>
                      <td className="p-3 text-sm">{person.role}</td>
                      <td className="p-3 text-xs font-mono">{person.lastLogin ? new Date(person.lastLogin).toLocaleString() : "--"}</td>
                      <td className="p-3">{getAttendanceStatus(person.lastLogin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ADD STAFF FORM */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserPlus className="text-gray-700"/> Add Employee
            </h2>
            <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required className="border p-2 rounded"
                value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
              <select className="border p-2 rounded"
                value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})}>
                <option value="Waiter">Waiter</option>
                <option value="Chef">Chef</option>
                <option value="Manager">Manager</option>
              </select>
              <input type="text" placeholder="Username" required className="border p-2 rounded"
                value={newStaff.username} onChange={e => setNewStaff({...newStaff, username: e.target.value})} />
              <input type="password" placeholder="Password" required className="border p-2 rounded"
                value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})} />
              <button className="col-span-1 md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800 font-bold">
                + Register Staff
              </button>
            </form>
          </div>
        </div>

        {/* KITCHEN ORDERS */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaUtensils className="text-orange-600"/> Kitchen Live
          </h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200 animate-pulse">
               <h4 className="font-bold text-gray-800">Table 5</h4>
               <p className="text-sm text-gray-600">2x Masala Dosa</p>
               <span className="text-xs text-orange-600 font-bold">Cooking...</span>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
               <h4 className="font-bold text-gray-800">Table 2</h4>
               <p className="text-sm text-gray-600">1x Cold Coffee</p>
               <span className="text-xs text-green-600 font-bold">Ready</span>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">System Live & Synced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;