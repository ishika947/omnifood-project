import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate add kiya
import { useCart } from '../context/CartContext';
import { FaUtensils, FaShoppingCart, FaUserTie, FaUser } from 'react-icons/fa';

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
      
      <Link to="/" className="flex items-center gap-2 text-2xl font-black italic text-gray-800">
        <FaUtensils className="text-orange-600" />
        <span>OmniFood</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <Link to="/menu" className="hover:text-orange-600">Menu</Link>
        <Link to="/book" className="hover:text-orange-600">Book Table</Link>
        <Link to="/about" className="hover:text-orange-600">About Us</Link>
      </div>

      <div className="flex items-center gap-3">
        
        {/* CART BUTTON */}
        <Link to="/cart">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-700 transition shadow-lg relative">
            <FaShoppingCart />
            <span>{cart.length}</span>
          </button>
        </Link>

        {/* CUSTOMER LOGIN / PROFILE */}
        {customer ? (
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-gray-50">
             <FaUser className="text-orange-600"/>
             <span className="font-bold text-sm">{customer.name.split(' ')[0]}</span>
             <button onClick={handleCustomerLogout} className="text-xs text-red-500 hover:underline ml-2">Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="text-sm font-bold text-gray-700 hover:text-orange-600 border border-gray-300 px-3 py-2 rounded-lg">
             User Login
          </Link>
        )}

        {/* STAFF LOGIN (ADMIN) */}
        <Link to="/login" className="text-xs font-bold text-gray-400 hover:text-black flex items-center gap-1">
           <FaUserTie /> Staff
        </Link>

      </div>
    </nav>
  );
};
export default Navbar;