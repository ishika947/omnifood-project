// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { motion } from 'framer-motion';
// import { FaStar, FaSearch } from 'react-icons/fa'; // Search Icon Import kiya

// const Menu = () => {
//   const [foods, setFoods] = useState([]);
//   const [filteredFoods, setFilteredFoods] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState(""); // NEW: Search State
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart } = useCart();
//   const categories = ["All", "Main Course", "Dessert", "Drinks"];

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:5000/api/foods');
//         setFoods(data);
//         setFilteredFoods(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };
//     fetchFoods();
//   }, []);

//   // --- NEW: SMART FILTER LOGIC (Category + Search mix) ---
//   useEffect(() => {
//     let result = foods;

//     // 1. Filter by Category
//     if (activeCategory !== "All") {
//       result = result.filter((item) => item.category === activeCategory);
//     }

//     // 2. Filter by Search Query
//     if (searchQuery) {
//       result = result.filter((item) => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredFoods(result);
//   }, [searchQuery, activeCategory, foods]);

//   const handleOrder = (item) => {
//     addToCart(item);
//     alert(`🛒 Added to Cart: ${item.name}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
      
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Our Menu</h1>
//         <p className="text-gray-500">Delicious food waiting for you</p>
        
//         {/* --- NEW: SEARCH BAR --- */}
//         <div className="max-w-md mx-auto mt-6 relative">
//           <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
//           <input 
//             type="text" 
//             placeholder="Search for 'Burger', 'Paneer'..." 
//             className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 shadow-sm"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* CATEGORY FILTER */}
//         <div className="flex flex-wrap justify-center gap-4 mt-6">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-6 py-2 rounded-full font-bold transition shadow-sm border 
//                 ${activeCategory === cat 
//                   ? "bg-orange-600 text-white border-orange-600" 
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center">Loading menu...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {filteredFoods.length > 0 ? (
//             filteredFoods.map((item) => (
//               <motion.div 
//                 key={item._id}
//                 layout
//                 initial={{ opacity: 0 }} 
//                 animate={{ opacity: 1 }}
//                 className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition"
//               >
//                 <div className="h-56 overflow-hidden relative">
//                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
//                   {item.isSpecialOffer && (
//                     <span className="absolute top-4 left-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-r shadow-md">OFFER</span>
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start">
//                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
//                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><FaStar/> {item.rating}</span>
//                   </div>
//                   <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
//                   <div className="flex justify-between items-center mt-6">
//                      <span className="text-2xl font-bold text-gray-800">₹{item.isSpecialOffer ? item.discountedPrice : item.originalPrice}</span>
//                      <button onClick={() => handleOrder(item)} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition">Add +</button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-3 text-center py-10 text-gray-400">
//                <p className="text-xl">No food found matching "{searchQuery}" 🍔</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FaStar, FaSearch } from 'react-icons/fa';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();

  // --- UPDATED CATEGORIES (Starters aur Thali Add kiya) ---
  const categories = ["All", "Starters", "Thali", "Main Course", "Dessert", "Drinks"];

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get('https://omnifood-project-cgkz.onrender.com/api/foods');
        setFoods(data);
        setFilteredFoods(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // --- SMART FILTER LOGIC ---
  useEffect(() => {
    let result = foods;

    // 1. Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      result = result.filter((item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFoods(result);
  }, [searchQuery, activeCategory, foods]);

  const handleOrder = (item) => {
    addToCart(item);
    // Optional: Toast notification can be added here
    alert(`🛒 Added to Cart: ${item.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-500">Delicious food waiting for you</p>
        
        {/* SEARCH BAR */}
        <div className="max-w-md mx-auto mt-6 relative">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for 'Noodles', 'Thali'..." 
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition shadow-sm border 
                ${activeCategory === cat 
                  ? "bg-orange-600 text-white border-orange-600 scale-105" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading delicious items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((item) => (
              <motion.div 
                key={item._id}
                layout
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition flex flex-col h-full"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  {item.isSpecialOffer && (
                    <span className="absolute top-4 left-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-r shadow-md">OFFER</span>
                  )}
                  {/* Veg Indicator */}
                  <span className={`absolute top-4 right-4 w-5 h-5 border-2 flex items-center justify-center bg-white ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><FaStar/> {item.rating}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center mt-6">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">₹{item.isSpecialOffer ? item.discountedPrice : item.originalPrice}</span>
                        {item.isSpecialOffer && <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>}
                      </div>
                      <button onClick={() => handleOrder(item)} className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 hover:scale-105 transition shadow-lg">Add +</button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400">
               <p className="text-xl">No food found matching "{searchQuery}" 🍔</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;