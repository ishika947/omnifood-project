import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCreditCard, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // DISCOUNT LOGIC: Orders above 700 get 10% OFF
  const discount = totalPrice > 700 ? Math.round(totalPrice * 0.10) : 0;
  const finalTotal = totalPrice - discount;

  const handleCheckout = () => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (!customer) {
      alert("Please Login to Place Order!");
      navigate('/auth'); // Redirect to Customer Login
      return;
    }

    setProcessing(true); // Start Fake Loading

    // Simulate Payment Delay (3 Seconds)
    setTimeout(() => {
      setProcessing(false);
      alert(`🎉 ORDER PLACED SUCCESSFULLY!\n\n📄 Invoice Sent to: ${customer.email}\n💰 Total Paid: ₹${finalTotal}\n🚚 Delivering to: ${customer.address}`);
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
      <p className="text-gray-500">Do not close this window.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* LEFT: CART ITEMS */}
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

        {/* RIGHT: BILL SUMMARY & PAYMENT */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Bill Details</h2>
          
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Item Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Delivery Fee</span>
            <span className="text-green-600">FREE</span>
          </div>

          {/* DYNAMIC DISCOUNT SECTION */}
          {totalPrice > 700 ? (
             <div className="flex justify-between mb-4 text-green-600 font-bold bg-green-50 p-2 rounded border border-green-200">
               <span>🎉 JUMBO OFFER (10% OFF)</span>
               <span>- ₹{discount}</span>
             </div>
          ) : (
            <p className="text-xs text-red-500 mb-4 text-right">Add items worth ₹{701 - totalPrice} more for 10% OFF!</p>
          )}

          <hr className="my-4"/>
          <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
            <span>TO PAY</span>
            <span>₹{finalTotal}</span>
          </div>

          {/* PAYMENT OPTIONS */}
          <h3 className="font-bold mb-3">Payment Method</h3>
          <div className="space-y-3 mb-6">
            <div 
              onClick={() => setPaymentMethod("UPI")}
              className={`p-3 border rounded cursor-pointer flex items-center gap-3 ${paymentMethod === "UPI" ? "border-orange-500 bg-orange-50" : ""}`}
            >
              <FaCreditCard className="text-blue-600"/> <span>UPI / PhonePe / Paytm</span>
            </div>
            <div 
              onClick={() => setPaymentMethod("COD")}
              className={`p-3 border rounded cursor-pointer flex items-center gap-3 ${paymentMethod === "COD" ? "border-orange-500 bg-orange-50" : ""}`}
            >
              <FaMoneyBillWave className="text-green-600"/> <span>Cash on Delivery</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-xl"
          >
            Pay ₹{finalTotal} Securely
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;