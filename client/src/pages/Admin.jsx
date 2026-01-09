import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserTie, FaUtensils, FaUserPlus, FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [staff, setStaff] = useState([]); 
  
  // New Staff Form State
  const [newStaff, setNewStaff] = useState({ name: "", username: "", password: "", role: "Waiter" });

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

  // Fetch Staff from DB
  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/staff');
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff");
    }
  };

  // 2. Attendance Logic
  const getAttendanceStatus = (lastLoginDate) => {
    if (!lastLoginDate) return <span className="text-gray-400">Not Logged In</span>;
    
    const loginTime = new Date(lastLoginDate);
    // Cutoff time 9:15 AM
    if (loginTime.getHours() > 9 || (loginTime.getHours() === 9 && loginTime.getMinutes() > 15)) {
       return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><FaExclamationTriangle/> LATE (Fined)</span>;
    }
    return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">On Time</span>;
  };

  // 3. Add New Staff Function
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/staff/create', newStaff);
      alert("✅ New Staff Member Added Successfully!");
      fetchStaff(); // Refresh List
      setNewStaff({ name: "", username: "", password: "", role: "Waiter" }); // Reset Form
    } catch (err) {
      alert("Failed to add staff. Username might be taken.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-600">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Control Center</h1>
          <p className="text-gray-500">Managing: <span className="text-orange-600 font-bold">OmniFood Restaurant</span></p>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: STAFF MANAGEMENT */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* STAFF LIST */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserTie className="text-blue-600"/> Staff Attendance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Last Login</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((person) => (
                    <tr key={person._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-700">{person.name}</td>
                      <td className="p-3 text-sm">{person.role}</td>
                      <td className="p-3 text-xs font-mono">
                        {person.lastLogin ? new Date(person.lastLogin).toLocaleString() : "--"}
                      </td>
                      <td className="p-3">
                        {getAttendanceStatus(person.lastLogin)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ADD NEW STAFF FORM */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserPlus className="text-orange-600"/> Register New Employee
            </h2>
            <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Full Name" required 
                className="border p-2 rounded"
                value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})}
              />
              <select 
                className="border p-2 rounded"
                value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})}
              >
                <option value="Waiter">Waiter</option>
                <option value="Chef">Chef</option>
                <option value="Manager">Manager</option>
              </select>
              <input 
                type="text" placeholder="Create Username" required 
                className="border p-2 rounded"
                value={newStaff.username} onChange={e => setNewStaff({...newStaff, username: e.target.value})}
              />
              <input 
                type="text" placeholder="Set Password" required 
                className="border p-2 rounded"
                value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})}
              />
              <button className="col-span-1 md:col-span-2 bg-gray-800 text-white py-2 rounded hover:bg-black font-bold">
                + Add Staff Member
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: KITCHEN ORDERS */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaUtensils className="text-green-600"/> Kitchen Live Status
          </h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
               <h4 className="font-bold">Table 5</h4>
               <p className="text-sm">2x Masala Dosa</p>
               <span className="text-xs text-orange-600 font-bold">Preparing...</span>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
               <h4 className="font-bold">Table 2</h4>
               <p className="text-sm">1x Cold Coffee</p>
               <span className="text-xs text-green-600 font-bold">Ready to Serve</span>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">Real-time order sync active</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;