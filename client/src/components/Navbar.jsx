import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaUtensils, FaShoppingCart, FaUserTie, FaUser, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  // Check if Customer is logged in
  const customer = JSON.parse(localStorage.getItem("customer"));

  const handleCustomerLogout = () => {
    localStorage.removeItem("customer");
    navigate('/');
    window.location.reload(); // Refresh to update UI
  };

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* --- LOGO --- */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-black italic text-gray-800">
        <FaUtensils className="text-orange-600" />
        <span>OmniFood</span>
      </Link>

      {/* --- MIDDLE NAVIGATION --- */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <Link to="/" className="hover:text-orange-600 transition">Home</Link>
        <Link to="/menu" className="hover:text-orange-600 transition">Menu</Link>
        <Link to="/book" className="hover:text-orange-600 transition">Book Table</Link>
        <Link to="/about" className="hover:text-orange-600 transition">About Us</Link>
      </div>

      {/* --- RIGHT ACTIONS --- */}
      <div className="flex items-center gap-4">
        
        {/* 1. CART BUTTON */}
        <Link to="/cart">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-700 transition shadow-lg relative">
            <FaShoppingCart />
            <span className="font-bold">{cart.length}</span>
          </button>
        </Link>

        {/* 2. CUSTOMER SECTION (Login/Profile) */}
        {customer ? (
          <div className="flex items-center gap-4">
            
            {/* My Orders Link */}
            <Link to="/my-orders" className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-orange-600 transition">
               <FaBoxOpen /> Orders
            </Link>

            {/* Profile & Logout */}
            <div className="flex items-center gap-2 border-l pl-4">
               <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                 <FaUser className="text-orange-600"/>
                 <span className="font-bold text-sm text-gray-700">{customer.name.split(' ')[0]}</span>
               </div>
               <button 
                 onClick={handleCustomerLogout} 
                 className="text-gray-400 hover:text-red-500 transition" 
                 title="Logout"
               >
                 <FaSignOutAlt />
               </button>
            </div>
          </div>
        ) : (
          <Link to="/auth" className="text-sm font-bold text-gray-700 hover:text-orange-600 border border-gray-300 px-4 py-2 rounded-full hover:border-orange-600 transition">
             User Login
          </Link>
        )}

        {/* 3. STAFF LOGIN (Admin) */}
        <Link to="/login" className="hidden md:flex text-xs font-bold text-gray-400 hover:text-black items-center gap-1 ml-2">
           <FaUserTie /> Staff
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;