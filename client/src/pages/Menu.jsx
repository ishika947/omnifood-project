import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar, FaTag, FaClock, FaUtensils } from 'react-icons/fa';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Food Data when page loads
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/foods');
        setFoods(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // 2. NEW: Order Logic (Viva Feature)
  const handleOrder = (item) => {
    // Logic: Main Course takes 25 mins, Desserts take 10 mins
    const prepTime = item.category === 'Dessert' ? '10-12 mins' : '20-25 mins';
    
    // Show realistic order confirmation
    alert(
      `✅ ORDER PLACED SUCCESSFULLY!\n\n` +
      `🍛 Item: ${item.name}\n` +
      `👨‍🍳 Kitchen Status: Chef Notified\n` +
      `⏳ Estimated Time: ${prepTime}\n\n` +
      `Sit back and relax! Your food is on its way.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Explore Our <span className="text-orange-600 italic">Menu</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Taste the best dishes in Indore, prepared by our top chefs with fresh ingredients.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading delicious items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Loop through foods and display Cards */}
          {foods.map((item) => (
            <motion.div 
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative group"
            >
              
              {/* UNIQUE FEATURE: Special Offer Badge */}
              {item.isSpecialOffer && (
                <div className="absolute top-4 left-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-r-lg z-10 shadow-md flex items-center gap-1">
                  <FaTag /> SPECIAL DEAL
                </div>
              )}

              {/* Food Image */}
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 opacity-80">
                  <p className="text-white text-xs font-bold bg-orange-600 inline-block px-2 py-1 rounded">
                    {item.category || 'Main Course'}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                    <FaStar /> {item.rating}
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>

                {/* Price & Action Row */}
                <div className="flex justify-between items-center mt-6 border-t pt-4">
                  <div>
                    {/* Show Discounted Price if Special Offer */}
                    {item.isSpecialOffer ? (
                      <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-xs">₹{item.originalPrice}</span>
                        <span className="text-2xl font-bold text-gray-800">₹{item.discountedPrice}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">₹{item.originalPrice}</span>
                    )}
                  </div>
                  
                  {/* ORDER BUTTON WITH LOGIC */}
                  <button 
                    onClick={() => handleOrder(item)}
                    className="bg-orange-100 text-orange-700 border border-orange-200 px-4 py-2 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition flex items-center gap-2"
                  >
                    Add <span className="text-lg">+</span>
                  </button>
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