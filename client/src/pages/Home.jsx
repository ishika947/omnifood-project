import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaCaretDown, FaStar } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. ZOMATO STYLE HERO SECTION */}
      <div className="relative h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')" }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          {/* Logo Text */}
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-extrabold italic mb-6 tracking-wide"
          >
            OmniFood
          </motion.h1>
          
          <p className="text-2xl md:text-4xl mb-8 font-light">Discover the best food & drinks in Indore</p>
          
          {/* Search Bar Container */}
          <div className="bg-white p-3 rounded-lg flex flex-col md:flex-row items-center gap-4 w-full max-w-3xl shadow-2xl">
            {/* Location Dropdown */}
            <div className="flex items-center gap-2 text-gray-500 border-b md:border-b-0 md:border-r border-gray-300 px-4 py-2 w-full md:w-1/3">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <input type="text" placeholder="Indore, India" className="outline-none w-full text-gray-700" readOnly />
              <FaCaretDown />
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 text-gray-500 px-4 py-2 w-full md:w-2/3">
              <FaSearch className="text-gray-400 text-xl" />
              <input type="text" placeholder="Search for dishes (e.g. Pizza, Burger)..." className="outline-none w-full text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY CARDS (Order Online, Dining Out) */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Order Online */}
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

          {/* Card 2: Dining Out (Booking) */}
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

      {/* 3. COLLECTIONS SECTION */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Collections</h2>
          <div className="flex justify-between items-end mb-8">
            <p className="text-gray-500">Explore curated lists of top dishes for your mood</p>
            <Link to="/menu" className="text-red-500 hover:text-red-600">All collections in Indore &gt;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Collection Items */}
            {[
              { title: "Live Sports Screenings", count: "5 Places", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" },
              { title: "Newly Opened", count: "3 Places", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500" },
              { title: "Veggie Friendly", count: "9 Places", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
              { title: "Trending This Week", count: "12 Places", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500" },
            ].map((item, index) => (
              <div key={index} className="relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-lg group">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <span className="text-sm">{item.count} &gt;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ACCORDION / EXPLORE OPTIONS */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Explore options near me</h2>
        <div className="space-y-4">
           <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
             <h3 className="text-xl text-gray-700 font-medium">Popular Cuisines Near Me</h3>
           </div>
           <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
             <h3 className="text-xl text-gray-700 font-medium">Popular Restaurant Types Near me</h3>
           </div>
           <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
             <h3 className="text-xl text-gray-700 font-medium">Top Rated Restaurants</h3>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Home;