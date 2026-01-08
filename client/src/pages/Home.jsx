import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animation library

const Home = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Taste the <span className="text-orange-500">Extraordinary</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Experience fine dining with our exclusive <strong>Zero-Waste</strong> kitchen and smart table booking.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link to="/menu" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-lg">
            Order Food
          </Link>
          <Link to="/book" className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg transition">
            Book a Table
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;