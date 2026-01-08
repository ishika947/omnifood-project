import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
//import { FaStar, FaTag } from 'react-icons/fa'; // Icons for rating and offers
import { FaStar, FaTag } from 'react-icons/fa';
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our <span className="text-orange-600">Exclusive Menu</span>
      </h1>

      {loading ? (
        <p className="text-center text-xl">Loading delicious items...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Loop through foods and display Cards */}
          {foods.map((item) => (
            <motion.div 
              key={item._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 relative"
            >
              {/* UNIQUE FEATURE: Special Offer Badge */}
              {item.isSpecialOffer && (
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg z-10">
                  SPECIAL OFFER
                </div>
              )}

              {/* Food Image */}
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <FaStar /> {item.rating}
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    {/* Show Discounted Price if Special Offer */}
                    {item.isSpecialOffer ? (
                      <>
                        <span className="text-gray-400 line-through text-sm mr-2">₹{item.originalPrice}</span>
                        <span className="text-2xl font-bold text-gray-800">₹{item.discountedPrice}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">₹{item.originalPrice}</span>
                    )}
                  </div>
                  
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-full font-medium hover:bg-orange-700 transition">
                    Add +
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