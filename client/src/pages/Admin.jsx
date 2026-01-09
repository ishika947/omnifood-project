import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserTie, FaUtensils, FaUserPlus, FaSignOutAlt, FaChartBar, FaChartPie, FaExclamationTriangle, FaArrowUp } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", username: "", password: "", role: "Waiter" });

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
       return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><FaExclamationTriangle/> LATE</span>;
    }
    return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">On Time</span>;
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/staff/create', newStaff);
      alert("✅ Staff Added!");
      fetchStaff();
      setNewStaff({ name: "", username: "", password: "", role: "Waiter" });
    } catch (err) {
      alert("Error adding staff.");
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
          <p className="text-gray-500">Welcome, <span className="text-orange-600 font-bold">{currentUser.name}</span></p>
        </div>
        <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-200 transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* --- SECTION 1: CSS ANALYTICS (NO LIBRARIES) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* CARD 1: REVENUE BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700">
            <FaChartBar className="text-blue-600"/> Weekly Revenue
          </h2>
          {/* Custom CSS Bar Chart */}
          <div className="flex items-end justify-between h-48 px-2 space-x-2">
            {[40, 60, 35, 80, 55, 90, 70].map((height, index) => (
              <div key={index} className="flex flex-col items-center w-full group">
                <div className="text-xs font-bold text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition">₹{height}k</div>
                <div 
                  style={{ height: `${height}%` }} 
                  className="w-full bg-blue-500 rounded-t-md hover:bg-orange-500 transition-all duration-300 cursor-pointer"
                ></div>
                <div className="text-xs text-gray-400 mt-2 font-bold">{['M','T','W','T','F','S','S'][index]}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-green-600 font-bold mt-4 flex justify-center items-center gap-1">
             <FaArrowUp/> 12% increase from last week
          </p>
        </div>

        {/* CARD 2: POPULAR ITEMS PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700 self-start">
            <FaChartPie className="text-purple-600"/> Best Sellers
          </h2>
          
          <div className="flex items-center gap-8">
            {/* CSS Conic Gradient Pie Chart */}
            <div 
              className="w-40 h-40 rounded-full shadow-inner border-4 border-white"
              style={{ background: 'conic-gradient(#f97316 0% 40%, #3b82f6 40% 70%, #22c55e 70% 100%)' }}
            ></div>
            
            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm font-bold text-gray-600">Pizza (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-bold text-gray-600">Burgers (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-bold text-gray-600">Drinks (30%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- SECTION 2: STAFF & KITCHEN --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* STAFF LIST */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserTie className="text-gray-700"/> Staff Team
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

          {/* ADD STAFF */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-black">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserPlus/> Add New Staff
            </h2>
            <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" required className="border p-2 rounded"
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
                + Register
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
            <p className="text-xs text-gray-400 text-center mt-4">System Online</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;