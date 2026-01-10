// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaUserTie, FaUtensils, FaUserPlus, FaSignOutAlt, 
//   FaChartBar, FaChartPie, FaArrowUp, FaPrint, FaReceipt, FaEnvelope 
// } from 'react-icons/fa';

// const Admin = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [staff, setStaff] = useState([]);
//   const [messages, setMessages] = useState([]); // Store Contact Messages
//   const [newStaff, setNewStaff] = useState({ name: "", username: "", password: "", role: "Waiter" });

//   // Dummy Orders for Billing Demo
//   const recentOrders = [
//     { _id: "ORD-1024", customerName: "Rohan Das", tableNo: 4, items: [{ name: "Thali", qty: 2, price: 300 }], totalAmount: 600 },
//     { _id: "ORD-1025", customerName: "Anjali", tableNo: 2, items: [{ name: "Burger", qty: 1, price: 150 }], totalAmount: 150 },
//   ];

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) navigate("/login");
//     else {
//       setCurrentUser(user);
//       fetchStaff();
//       fetchMessages(); // Fetch Messages on Load
//     }
//   }, []);

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/staff');
//       setStaff(res.data);
//     } catch (err) { console.error("Error fetching staff"); }
//   };

//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/contact');
//       setMessages(res.data);
//     } catch (err) { console.error("Error fetching messages"); }
//   };

//   const handlePrintBill = (order) => {
//     const billWindow = window.open('', '', 'width=400,height=600');
//     billWindow.document.write(`
//       <html>
//         <body style="font-family:monospace; text-align:center;">
//           <h2>OmniFood</h2>
//           <p>Indore, M.P.</p>
//           <hr/>
//           <p>Bill: ${order._id}</p>
//           <p>Customer: ${order.customerName}</p>
//           <hr/>
//           ${order.items.map(i => `<div style="display:flex; justify-content:space-between;"><span>${i.name} x${i.qty}</span><span>₹${i.price * i.qty}</span></div>`).join('')}
//           <hr/>
//           <h3>TOTAL: ₹${order.totalAmount}</h3>
//           <p>Thank You!</p>
//           <script>window.print();</script>
//         </body>
//       </html>
//     `);
//     billWindow.document.close();
//   };

//   const handleAddStaff = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/staff/create', newStaff);
//       alert("✅ Staff Added!");
//       fetchStaff();
//       setNewStaff({ name: "", username: "", password: "", role: "Waiter" });
//     } catch (err) { alert("Error adding staff."); }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   if (!currentUser) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
      
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-600">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//           <p className="text-gray-500">Welcome, <span className="text-orange-600 font-bold">{currentUser.name}</span></p>
//         </div>
//         <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-200">
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>

//       {/* --- SECTION 1: CHARTS --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700"><FaChartBar className="text-blue-600"/> Revenue</h2>
//           <div className="flex items-end justify-between h-48 px-2 space-x-2">
//             {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
//               <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500 rounded-t-md hover:bg-orange-500 transition-all cursor-pointer"></div>
//             ))}
//           </div>
//           <p className="text-center text-xs text-green-600 font-bold mt-4 flex justify-center items-center gap-1"><FaArrowUp/> 12% increase</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
//           <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700 self-start"><FaChartPie className="text-purple-600"/> Best Sellers</h2>
//           <div className="w-40 h-40 rounded-full shadow-inner border-4 border-white" style={{ background: 'conic-gradient(#f97316 0% 40%, #3b82f6 40% 70%, #22c55e 70% 100%)' }}></div>
//           <div className="mt-4 flex gap-4 text-xs font-bold text-gray-600">
//              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Pizza</span>
//              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Burger</span>
//           </div>
//         </div>
//       </div>

//       {/* --- SECTION 2: BILLING & POS --- */}
//       <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-green-600">
//         <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800"><FaReceipt className="text-green-600"/> Billing</h2>
//         <table className="w-full text-left">
//            <thead><tr className="bg-gray-100 text-sm uppercase text-gray-600"><th className="p-3">ID</th><th className="p-3">Customer</th><th className="p-3">Total</th><th className="p-3">Action</th></tr></thead>
//            <tbody>
//              {recentOrders.map(order => (
//                <tr key={order._id} className="border-b">
//                  <td className="p-3 font-mono font-bold text-orange-600">{order._id}</td>
//                  <td className="p-3">{order.customerName}</td>
//                  <td className="p-3 font-bold">₹{order.totalAmount}</td>
//                  <td className="p-3"><button onClick={() => handlePrintBill(order)} className="bg-black text-white px-3 py-1 rounded text-xs flex items-center gap-2"><FaPrint /> Print</button></td>
//                </tr>
//              ))}
//            </tbody>
//         </table>
//       </div>

//       {/* --- SECTION 3: CUSTOMER MESSAGES (INBOX) --- */}
//       <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-blue-600">
//         <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800"><FaEnvelope className="text-blue-600"/> Messages Inbox</h2>
//         <div className="max-h-64 overflow-y-auto space-y-3">
//           {messages.length === 0 ? <p className="text-gray-400">No messages yet.</p> : messages.map((msg) => (
//             <div key={msg._id} className="p-3 bg-gray-50 rounded border hover:bg-gray-100">
//               <div className="flex justify-between">
//                 <p className="font-bold text-sm">{msg.name} <span className="text-gray-400 font-normal text-xs">&lt;{msg.email}&gt;</span></p>
//                 <span className="text-[10px] text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
//               </div>
//               <p className="text-gray-600 text-sm mt-1">{msg.message}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- SECTION 4: STAFF & KITCHEN --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <div className="bg-white p-6 rounded-xl shadow-lg">
//             <h2 className="text-xl font-bold mb-4"><FaUserTie/> Staff Team</h2>
//             <table className="w-full text-left">
//               <thead><tr className="bg-gray-100 text-sm"><th className="p-3">Name</th><th className="p-3">Role</th></tr></thead>
//               <tbody>{staff.map((p) => <tr key={p._id} className="border-b"><td className="p-3 font-bold">{p.name}</td><td className="p-3">{p.role}</td></tr>)}</tbody>
//             </table>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg">
//             <h2 className="text-xl font-bold mb-4"><FaUserPlus/> Add Staff</h2>
//             <form onSubmit={handleAddStaff} className="grid grid-cols-2 gap-4">
//               <input type="text" placeholder="Name" required className="border p-2 rounded" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
//               <input type="text" placeholder="Username" required className="border p-2 rounded" value={newStaff.username} onChange={e => setNewStaff({...newStaff, username: e.target.value})} />
//               <input type="password" placeholder="Password" required className="border p-2 rounded" value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})} />
//               <button className="col-span-2 bg-black text-white py-2 rounded font-bold">+ Add</button>
//             </form>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
//           <h2 className="text-xl font-bold mb-4 text-orange-600"><FaUtensils/> Kitchen Live</h2>
//           <div className="space-y-4">
//             <div className="bg-yellow-50 p-3 rounded border border-yellow-200 animate-pulse"><h4 className="font-bold">Table 5</h4><p className="text-sm">2x Thali</p><span className="text-xs text-orange-600 font-bold">Cooking...</span></div>
//             <div className="bg-green-50 p-3 rounded border border-green-200"><h4 className="font-bold">Table 2</h4><p className="text-sm">1x Coffee</p><span className="text-xs text-green-600 font-bold">Ready</span></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaUserTie, FaUtensils, FaUserPlus, FaSignOutAlt, 
  FaChartBar, FaChartPie, FaMoneyBillWave, FaPrint, 
  FaEnvelope, FaChair, FaCheckCircle, FaTimesCircle, FaClock 
} from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // Navigation State

  // Data States
  const [staff, setStaff] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", username: "", password: "", role: "Waiter" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
    else {
      setCurrentUser(user);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    try {
      const staffRes = await axios.get('http://localhost:5000/api/staff');
      const msgRes = await axios.get('http://localhost:5000/api/contact');
      // Dummy Orders for demo (Replace with API if needed)
      const dummyOrders = [
        { _id: "ORD-101", customerName: "Rahul", totalAmount: 500, status: "Cooking", items: [{name: "Thali", qty: 2, price: 250}] },
        { _id: "ORD-102", customerName: "Simran", totalAmount: 120, status: "Ready", items: [{name: "Coffee", qty: 2, price: 60}] }
      ];
      
      setStaff(staffRes.data);
      setMessages(msgRes.data);
      setOrders(dummyOrders);
    } catch (err) { console.error("Error fetching admin data"); }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/staff/create', newStaff);
    alert("Staff Added!");
    fetchAllData();
    setNewStaff({ name: "", username: "", password: "", role: "Waiter" });
  };

  const getAttendanceStatus = (lastLogin) => {
    if (!lastLogin) return <span className="text-gray-400 text-xs">Absent</span>;
    const loginTime = new Date(lastLogin);
    const today = new Date();
    
    // Check if logged in today
    if(loginTime.getDate() !== today.getDate()) return <span className="text-red-500 font-bold text-xs"><FaTimesCircle/> Absent</span>;

    // Check Late (Example: Late after 10 AM)
    if (loginTime.getHours() >= 10) {
       return <span className="text-yellow-600 font-bold text-xs flex items-center gap-1"><FaClock/> Late ({loginTime.toLocaleTimeString()})</span>;
    }
    return <span className="text-green-600 font-bold text-xs flex items-center gap-1"><FaCheckCircle/> On Time</span>;
  };

  const handlePrintBill = (order) => {
    const w = window.open('', '', 'width=400,height=600');
    w.document.write(`<html><body style="text-align:center; font-family:monospace;"><h2>OmniFood</h2><p>Bill: ${order._id}</p><hr/><h3>Total: ₹${order.totalAmount}</h3></body></html>`);
    w.document.close();
    w.print();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <div className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 text-2xl font-extrabold text-orange-500 tracking-wider border-b border-gray-800">
          OmniAdmin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "dashboard" ? "bg-orange-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800"}`}>
            <FaChartBar /> Dashboard
          </button>
          <button onClick={() => setActiveTab("orders")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "orders" ? "bg-orange-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800"}`}>
            <FaUtensils /> Live Orders
          </button>
          <button onClick={() => setActiveTab("staff")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "staff" ? "bg-orange-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800"}`}>
            <FaUserTie /> Staff & Attendance
          </button>
          <button onClick={() => setActiveTab("tables")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "tables" ? "bg-orange-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800"}`}>
            <FaChair /> Table Status
          </button>
          <button onClick={() => setActiveTab("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "messages" ? "bg-orange-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800"}`}>
            <FaEnvelope /> Inbox / Complaints
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-white transition font-bold"><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{activeTab} Overview</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-gray-600">System Online</span>
          </div>
        </div>

        {/* --- VIEW 1: DASHBOARD --- */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><FaMoneyBillWave size={24}/></div>
                <div><p className="text-gray-500 text-sm">Today's Sales</p><h3 className="text-2xl font-bold">₹12,450</h3></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600"><FaUtensils size={24}/></div>
                <div><p className="text-gray-500 text-sm">Active Orders</p><h3 className="text-2xl font-bold">8</h3></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600"><FaUserTie size={24}/></div>
                <div><p className="text-gray-500 text-sm">Staff Present</p><h3 className="text-2xl font-bold">{staff.length}</h3></div>
              </div>
            </div>
            {/* Chart Placeholder */}
            <div className="col-span-3 bg-white p-6 rounded-2xl shadow-sm h-64 flex items-center justify-center bg-gray-50">
               <p className="text-gray-400 font-bold">📊 Weekly Revenue Chart Area</p>
            </div>
          </div>
        )}

        {/* --- VIEW 2: STAFF & ATTENDANCE --- */}
        {activeTab === "staff" && (
          <div className="space-y-6 animate-fade-in">
            {/* Staff List Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Today's Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {staff.map(s => (
                    <tr key={s._id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-700">{s.name}</td>
                      <td className="p-4"><span className="bg-gray-200 px-2 py-1 rounded text-xs">{s.role}</span></td>
                      <td className="p-4">{getAttendanceStatus(s.lastLogin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Staff Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FaUserPlus/> Add New Staff</h3>
              <form onSubmit={handleAddStaff} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input type="text" placeholder="Full Name" required className="border p-2 rounded" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
                <select className="border p-2 rounded" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})}>
                  <option>Waiter</option><option>Chef</option><option>Cleaner</option><option>Manager</option>
                </select>
                <input type="text" placeholder="Username" required className="border p-2 rounded" value={newStaff.username} onChange={e => setNewStaff({...newStaff, username: e.target.value})} />
                <input type="password" placeholder="Password" required className="border p-2 rounded" value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})} />
                <button className="col-span-2 md:col-span-4 bg-black text-white py-2 rounded font-bold hover:bg-gray-800">Register Staff</button>
              </form>
            </div>
          </div>
        )}

        {/* --- VIEW 3: LIVE ORDERS --- */}
        {activeTab === "orders" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-lg">{order._id}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                   {order.items.map((i, idx) => <div key={idx} className="flex justify-between"><span>{i.qty}x {i.name}</span><span>₹{i.price * i.qty}</span></div>)}
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-bold text-xl">Total: ₹{order.totalAmount}</span>
                  <button onClick={() => handlePrintBill(order)} className="flex items-center gap-2 text-blue-600 hover:underline"><FaPrint/> Print Bill</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW 4: INBOX / COMPLAINTS --- */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in">
             {messages.length === 0 ? <p className="p-8 text-center text-gray-400">No new messages.</p> : (
               <div className="divide-y">
                 {messages.map(msg => (
                   <div key={msg._id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{msg.name} <span className="text-gray-500 text-sm font-normal">&lt;{msg.email}&gt;</span></h4>
                        <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{msg.message}</p>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {/* --- VIEW 5: TABLE STATUS --- */}
        {activeTab === "tables" && (
           <div className="grid grid-cols-3 gap-6 animate-fade-in">
             {[1,2,3,4,5,6].map(t => (
               <div key={t} className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-transparent hover:border-gray-200">
                  <FaChair size={40} className="mx-auto text-green-500 mb-4"/>
                  <h3 className="font-bold">Table {t}</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Available</span>
               </div>
             ))}
           </div>
        )}

      </div>
    </div>
  );
};

export default Admin;