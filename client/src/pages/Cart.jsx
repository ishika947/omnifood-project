import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaCreditCard, FaSpinner, FaLock } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Discount Logic
  const discount = totalPrice > 700 ? Math.round(totalPrice * 0.10) : 0;
  const finalTotal = totalPrice - discount;

  // --- SECURE CHECKOUT LOGIC ---
  const handleCheckout = () => {
    // 1. Check if Customer is Logged In
    const customer = JSON.parse(localStorage.getItem("customer"));
    
    if (!customer) {
      // Agar login nahi hai, alert do aur Login page par bhejo
      alert("🔒 Please Login to Place Order!");
      navigate('/auth'); 
      return; 
    }

    // 2. Agar Login hai, toh Payment Process karo
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(`🎉 ORDER PLACED!\n\nName: ${customer.name}\nTotal: ₹${finalTotal}\nStatus: Being Prepared`);
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-400">Cart Empty 😞</h2>
      <Link to="/menu" className="mt-4 text-orange-600 underline">Start Ordering</Link>
    </div>
  );

  if (processing) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <FaSpinner className="animate-spin text-6xl text-orange-600 mb-4"/>
      <h2 className="text-2xl font-bold text-gray-800">Processing Payment...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Your Items</h2>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.originalPrice} x {item.qty}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:underline">Remove</button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
            <span>TO PAY</span>
            <span>₹{finalTotal}</span>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-xl flex justify-center items-center gap-2"
          >
            <FaLock /> Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;