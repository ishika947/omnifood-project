import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingCart } from 'react-icons/fa'; // Icons

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600">
          <FaUtensils />
          <span>OmniFood</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-orange-600 transition">Home</Link>
          <Link to="/menu" className="hover:text-orange-600 transition">Menu</Link>
          <Link to="/book" className="hover:text-orange-600 transition">Book Table</Link>
        </div>

        {/* Cart Button (Future Feature) */}
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-700 transition">
          <FaShoppingCart />
          <span>Cart (0)</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;