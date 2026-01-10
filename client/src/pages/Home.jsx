// import React, { useState } from 'react'; // useState import kiya
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch, FaMapMarkerAlt, FaCaretDown, FaChevronUp } from 'react-icons/fa';

// const Home = () => {
//   // Logic to track which section is open
//   const [openSection, setOpenSection] = useState(null);

//   const toggleSection = (index) => {
//     // Agar wahi click kiya jo khula hai, toh band kar do (null), nahi toh naya kholo
//     setOpenSection(openSection === index ? null : index);
//   };

//   // Data for the Explore Options
//   const exploreOptions = [
//     {
//       title: "Popular Cuisines",
//       content: "Italian, Chinese, North Indian, South Indian, Continental, Mexican, Street Food, Desserts"
//     },
//     {
//       title: "Dietary Preferences (Veg/Non-Veg)",
//       content: "Pure Veg, Non-Veg, Vegan Options, Gluten Free, Eggitarian, Jain Food Available"
//     },
//     {
//       title: "Evening Snacks & Drinks",
//       content: "Coffee, Tea, Milkshakes, Sandwiches, Burgers, Fries, Mojitos, Smoothies"
//     }
//   ];

//   return (
//     <div className="bg-white min-h-screen">
      
//       {/* 1. HERO SECTION */}
//       <div className="relative h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')" }}>
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
//           <motion.h1 
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="text-6xl md:text-8xl font-extrabold italic mb-6 tracking-wide"
//           >
//             OmniFood
//           </motion.h1>
//           <p className="text-2xl md:text-4xl mb-8 font-light text-center">Discover the best food & drinks in Indore</p>
          
//           <div className="bg-white p-3 rounded-lg flex flex-col md:flex-row items-center gap-4 w-full max-w-3xl shadow-2xl">
//             <div className="flex items-center gap-2 text-gray-500 border-b md:border-b-0 md:border-r border-gray-300 px-4 py-2 w-full md:w-1/3 cursor-pointer">
//               <FaMapMarkerAlt className="text-red-500 text-xl" />
//               <input type="text" placeholder="Indore, India" className="outline-none w-full text-gray-700 cursor-pointer" readOnly />
//               <FaCaretDown />
//             </div>
//             <div className="flex items-center gap-2 text-gray-500 px-4 py-2 w-full md:w-2/3">
//               <FaSearch className="text-gray-400 text-xl" />
//               <input type="text" placeholder="Search for dishes..." className="outline-none w-full text-gray-700" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. CATEGORY CARDS */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Link to="/menu" className="group">
//             <motion.div whileHover={{ scale: 1.02 }} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white h-64 relative">
//               <div className="h-40 overflow-hidden">
//                 <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" alt="Order Online" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800">Order Online</h3>
//                 <p className="text-gray-500 mt-1">Stay home and order to your doorstep</p>
//               </div>
//             </motion.div>
//           </Link>
//           <Link to="/book" className="group">
//             <motion.div whileHover={{ scale: 1.02 }} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white h-64 relative">
//               <div className="h-40 overflow-hidden">
//                 <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" alt="Dining Out" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800">Dining Out</h3>
//                 <p className="text-gray-500 mt-1">Book a table for a premium experience</p>
//               </div>
//             </motion.div>
//           </Link>
//         </div>
//       </div>

//       {/* 3. COLLECTIONS */}
//       <div className="bg-gray-50 py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Collections</h2>
//           <div className="flex justify-between items-end mb-8">
//             <p className="text-gray-500">Explore curated lists of top dishes</p>
//             <Link to="/menu" className="text-red-500 hover:text-red-600">All collections in Indore &gt;</Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {[
//               { title: "Live Sports Screenings", count: "Live on Big Screen", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" },
//               { title: "New on Menu", count: "5 New Dishes", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500" },
//               { title: "Veggie Friendly", count: "12 Items", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
//               { title: "Trending This Week", count: "Best Sellers", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500" },
//             ].map((item, index) => (
//               <Link to="/menu" key={index}>
//                 <div className="relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-lg group">
//                   <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
//                   <div className="absolute bottom-4 left-4 text-white">
//                     <h4 className="text-lg font-semibold">{item.title}</h4>
//                     <span className="text-sm">{item.count} &gt;</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. EXPLORE OPTIONS (NOW WORKING!) */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Explore options</h2>
//         <div className="space-y-4">
//            {exploreOptions.map((option, index) => (
//              <div 
//                key={index} 
//                className="border rounded-lg bg-white overflow-hidden"
//              >
//                {/* Clickable Header */}
//                <div 
//                  onClick={() => toggleSection(index)}
//                  className="p-5 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
//                >
//                  <h3 className="text-xl text-gray-700 font-medium">{option.title}</h3>
//                  {openSection === index ? <FaChevronUp className="text-gray-500"/> : <FaCaretDown className="text-gray-500"/>}
//                </div>

//                {/* Collapsible Content */}
//                <AnimatePresence>
//                  {openSection === index && (
//                    <motion.div 
//                      initial={{ height: 0, opacity: 0 }}
//                      animate={{ height: "auto", opacity: 1 }}
//                      exit={{ height: 0, opacity: 0 }}
//                      className="px-5 pb-5 text-gray-500 border-t"
//                    >
//                      <p className="pt-2">{option.content}</p>
//                    </motion.div>
//                  )}
//                </AnimatePresence>
//              </div>
//            ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Home;





import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaMapMarkerAlt, FaCaretDown, FaChevronUp, 
  FaMotorcycle, FaTimes, FaCheckCircle 
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [openSection, setOpenSection] = useState(null); // Accordion state
  
  // Tracking States
  const [trackId, setTrackId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);

  // --- HANDLERS ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/menu', { state: { search: searchTerm } });
    }
  };

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleTrackOrder = async () => {
    if (!trackId) return alert("Please enter an Order ID");
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${trackId}`);
      setOrderStatus(res.data.status); // e.g. "Cooking"
      setShowTrackModal(true);
    } catch (err) {
      alert("❌ Order Not Found! Please check your ID (e.g. from the Bill)");
    }
  };

  const getProgress = (status) => {
    if (status === "Pending") return 10;
    if (status === "Cooking") return 50;
    if (status === "Ready" || status === "Completed") return 100;
    return 0;
  };

  // --- DATA ---
  const exploreOptions = [
    { title: "Popular Cuisines", content: "Italian, Chinese, North Indian, South Indian, Continental, Street Food" },
    { title: "Dietary Preferences", content: "Pure Veg, Non-Veg, Vegan Options, Gluten Free, Jain Food Available" },
    { title: "Evening Snacks & Drinks", content: "Coffee, Tea, Milkshakes, Burgers, Fries, Mojitos" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark Overlay */}
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold italic mb-4 tracking-wide"
          >
            OmniFood
          </motion.h1>
          <p className="text-xl md:text-3xl mb-8 font-light text-center opacity-90">Discover the best food & drinks in Indore</p>
          
          {/* --- 1. MAIN SEARCH BAR (DISHES) --- */}
          <div className="bg-white p-3 rounded-xl flex flex-col md:flex-row items-center gap-4 w-full max-w-3xl shadow-2xl">
            {/* Location (Static) */}
            <div className="flex items-center gap-2 text-gray-500 border-b md:border-b-0 md:border-r border-gray-300 px-4 py-2 w-full md:w-1/3 cursor-pointer">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <input type="text" placeholder="Indore, India" className="outline-none w-full text-gray-700 cursor-pointer" readOnly />
              <FaCaretDown />
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 text-gray-500 px-4 py-2 w-full md:w-2/3">
              <FaSearch className="text-gray-400 text-xl" />
              <input 
                type="text" 
                placeholder="Search for 'Pizza', 'Thali'..." 
                className="outline-none w-full text-gray-700" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* --- 2. ORDER TRACKING BOX (ADDED HERE) --- */}
          <div className="mt-8 flex flex-col items-center animate-fade-in-up">
             <p className="text-gray-200 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
               Already ordered? Track here:
             </p>
             <div className="bg-white/90 backdrop-blur-sm p-1 rounded-full flex items-center shadow-lg border-2 border-orange-500/50">
               <input 
                 type="text" 
                 placeholder="Enter Order ID..." 
                 className="bg-transparent text-gray-800 px-4 py-2 text-sm outline-none w-40 placeholder-gray-500 font-mono"
                 value={trackId} 
                 onChange={e => setTrackId(e.target.value)} 
               />
               <button 
                 onClick={handleTrackOrder} 
                 className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition shadow-md flex items-center justify-center"
               >
                 <FaMotorcycle size={16}/>
               </button>
             </div>
          </div>

        </div>
      </div>

      {/* ================= CATEGORY CARDS ================= */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/menu" className="group">
            <motion.div whileHover={{ scale: 1.02 }} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white h-64 relative">
              <div className="h-40 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" alt="Order Online" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Order Online</h3>
                <p className="text-gray-500 mt-1">Stay home and order to your doorstep</p>
              </div>
            </motion.div>
          </Link>
          <Link to="/book" className="group">
            <motion.div whileHover={{ scale: 1.02 }} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white h-64 relative">
              <div className="h-40 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" alt="Dining Out" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Dining Out</h3>
                <p className="text-gray-500 mt-1">Book a table for a premium experience</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* ================= COLLECTIONS ================= */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Collections</h2>
          <div className="flex justify-between items-end mb-8">
            <p className="text-gray-500">Explore curated lists of top dishes</p>
            <Link to="/menu" className="text-red-500 hover:text-red-600">All collections in Indore &gt;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Live Sports Screenings", count: "Live on Big Screen", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" },
              { title: "New on Menu", count: "5 New Dishes", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500" },
              { title: "Veggie Friendly", count: "12 Items", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
              { title: "Trending This Week", count: "Best Sellers", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500" },
            ].map((item, index) => (
              <Link to="/menu" key={index}>
                <div className="relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-lg group">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <span className="text-sm">{item.count} &gt;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= EXPLORE OPTIONS (ACCORDION) ================= */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Explore options</h2>
        <div className="space-y-4">
           {exploreOptions.map((option, index) => (
             <div key={index} className="border rounded-lg bg-white overflow-hidden">
               <div 
                 onClick={() => toggleSection(index)}
                 className="p-5 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
               >
                 <h3 className="text-xl text-gray-700 font-medium">{option.title}</h3>
                 {openSection === index ? <FaChevronUp className="text-gray-500"/> : <FaCaretDown className="text-gray-500"/>}
               </div>
               <AnimatePresence>
                 {openSection === index && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="px-5 pb-5 text-gray-500 border-t"
                   >
                     <p className="pt-2">{option.content}</p>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           ))}
        </div>
      </div>

      {/* ================= TRACKING POPUP MODAL ================= */}
      {showTrackModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-bounce-in shadow-2xl">
            <button onClick={() => setShowTrackModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <FaTimes size={20}/>
            </button>
            
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Order Status</h3>
            <div className="text-center font-mono text-xs text-gray-500 mb-6 bg-gray-100 py-1 rounded">
              Order ID: {trackId}
            </div>

            {/* Progress Bar */}
            <div className="relative pt-6 pb-2 px-2">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000" 
                  style={{ width: `${getProgress(orderStatus)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className={orderStatus === "Pending" ? "text-green-600 scale-110 transition" : ""}>Pending</span>
                <span className={orderStatus === "Cooking" ? "text-orange-600 scale-110 transition" : ""}>Cooking</span>
                <span className={orderStatus === "Ready" || orderStatus === "Completed" ? "text-blue-600 scale-110 transition" : ""}>Ready</span>
              </div>
            </div>

            <div className="mt-8 text-center bg-gray-50 p-4 rounded-xl border border-gray-100">
               {orderStatus === "Pending" && <p className="text-gray-600 flex justify-center items-center gap-2">⏳ Waiting for restaurant confirmation.</p>}
               {orderStatus === "Cooking" && <p className="text-orange-600 font-bold flex justify-center items-center gap-2">🔥 The Chef is cooking your food!</p>}
               {orderStatus === "Ready" && <p className="text-green-600 font-bold flex justify-center items-center gap-2"><FaCheckCircle/> Your food is Ready!</p>}
               {orderStatus === "Completed" && <p className="text-blue-600 font-bold">🎉 Enjoy your meal!</p>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;