import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingCart, FaUserTie } from 'react-icons/fa'; // Added FaUserTie for Admin Icon

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* 1. LOGO SECTION */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-black italic text-gray-800">
        <FaUtensils className="text-orange-600" />
        <span>OmniFood</span>
      </Link>

      {/* 2. CENTER NAVIGATION LINKS */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <Link to="/" className="hover:text-orange-600 transition">Home</Link>
        <Link to="/menu" className="hover:text-orange-600 transition">Menu</Link>
        <Link to="/book" className="hover:text-orange-600 transition">Book Table</Link>
        <Link to="/about" className="hover:text-orange-600 transition">About Us</Link>
      </div>

      {/* 3. RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-4">
        
        {/* Cart Button (Future Feature) */}
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-700 transition shadow-lg transform hover:scale-105">
          <FaShoppingCart />
          <span>Cart (0)</span>
        </button>

        {/* NEW: Staff Login Button (Links to Admin Dashboard) */}
        <Link 
  to="/login"  
  className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black transition border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-200"
>
   <FaUserTie className="text-lg" />
   <span className="hidden md:inline">Staff Login</span>
</Link>

      </div>

    </nav>
  );
};

export default Navbar;