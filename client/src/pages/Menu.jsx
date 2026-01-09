import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FaStar, FaFilter } from 'react-icons/fa';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]); // Filtered List
  const [activeCategory, setActiveCategory] = useState("All"); // Current Category
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();

  // 1. Categories List
  const categories = ["All", "Main Course", "Dessert", "Drinks"];

  // 2. Fetch Data
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/foods');
        setFoods(data);
        setFilteredFoods(data); // Shuru mein sab dikhao
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // 3. Filter Function
  const filterMenu = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter((item) => item.category === category);
      setFilteredFoods(filtered);
    }
  };

  const handleOrder = (item) => {
    addToCart(item);
    alert(`🛒 Added to Cart: ${item.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Our Menu</h1>
        
        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterMenu(cat)}
              className={`px-6 py-2 rounded-full font-bold transition shadow-md border 
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
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredFoods.map((item) => (
            <motion.div 
              key={item._id}
              layout
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group"
            >
              <div className="h-56 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                {item.isSpecialOffer && (
                  <span className="absolute top-4 left-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-r">OFFER</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between">
                   <h3 className="text-xl font-bold">{item.name}</h3>
                   <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><FaStar/> {item.rating}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-6">
                   <span className="text-2xl font-bold">₹{item.isSpecialOffer ? item.discountedPrice : item.originalPrice}</span>
                   <button onClick={() => handleOrder(item)} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition">Add +</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;