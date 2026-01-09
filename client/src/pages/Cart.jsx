import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // API calls ke liye
import { FaMoneyBillWave, FaCreditCard, FaSpinner, FaLock, FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // --- DISCOUNT LOGIC ---
  // If total > 700, give 10% Discount
  const discount = totalPrice > 700 ? Math.round(totalPrice * 0.10) : 0;
  const finalTotal = totalPrice - discount;

  // --- CHECKOUT HANDLER ---
  const handleCheckout = async () => {
    // 1. Check if Customer is Logged In
    const customer = JSON.parse(localStorage.getItem("customer"));
    
    if (!customer) {
      alert("🔒 Please Login to Place Order!");
      navigate('/auth'); // Redirect to Login Page
      return; 
    }

    setProcessing(true); // Start Loading Spinner

    try {
      // 2. Prepare Order Data
      const orderData = {
        customerName: customer.name,
        customerEmail: customer.email,
        items: cart.map(item => ({
          name: item.name,
          price: item.isSpecialOffer ? item.discountedPrice : item.originalPrice,
          qty: item.qty
        })),
        totalAmount: finalTotal,
        status: "Preparing"
      };

      // 3. Send to Backend (Database)
      await axios.post('http://localhost:5000/api/orders', orderData);

      // 4. Success Actions
      setProcessing(false);
      alert(`🎉 ORDER PLACED SUCCESSFULLY!\n\nThank you, ${customer.name}!`);
      clearCart(); // Cart khali karo
      navigate('/my-orders'); // Order History page par bhejo
      
    } catch (err) {
      setProcessing(false);
      console.error(err);
      alert("❌ Order Failed! Please try again.");
    }
  };

  // --- UI: IF CART IS EMPTY ---
  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-40 mb-6 opacity-50"/>
      <h2 className="text-3xl font-bold text-gray-400">Your Cart is Empty</h2>
      <p className="text-gray-500 mt-2">Looks like you haven't made your choice yet.</p>
      <Link to="/menu" className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition">
        Browse Menu
      </Link>
    </div>
  );

  // --- UI: PROCESSING STATE ---
  if (processing) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white z-50">
      <FaSpinner className="animate-spin text-6xl text-orange-600 mb-4"/>
      <h2 className="text-2xl font-bold text-gray-800">Processing Payment...</h2>
      <p className="text-gray-500">Please do not close this window.</p>
    </div>
  );

  // --- UI: MAIN CART PAGE ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* LEFT COLUMN: CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg h-fit">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
             <h2 className="text-xl font-bold text-gray-700">Order Summary</h2>
             <span className="text-gray-500">{cart.length} Items</span>
          </div>
          
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Price: ₹{item.isSpecialOffer ? item.discountedPrice : item.originalPrice} x {item.qty}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                  title="Remove Item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: BILLING & PAYMENT */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit border-t-4 border-orange-500">
          <h2 className="text-xl font-bold mb-6 text-gray-700">Payment Details</h2>
          
          {/* Bill Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Item Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            
            {/* Dynamic Discount Alert */}
            {totalPrice > 700 ? (
               <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded border border-green-200">
                 <span>🎉 JUMBO DISCOUNT (10%)</span>
                 <span>- ₹{discount}</span>
               </div>
            ) : (
              <p className="text-xs text-red-500 text-right">
                Add items worth ₹{701 - totalPrice} more for 10% OFF!
              </p>
            )}

            <hr className="my-2"/>
            
            <div className="flex justify-between text-2xl font-bold text-gray-900">
              <span>Grand Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase">Choose Payment Method</h3>
          <div className="space-y-3 mb-8">
            <div 
              onClick={() => setPaymentMethod("UPI")}
              className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 transition ${paymentMethod === "UPI" ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "hover:bg-gray-50"}`}
            >
              <FaCreditCard className="text-blue-600"/> 
              <div>
                <span className="font-bold text-sm block">UPI / Online Payment</span>
                <span className="text-xs text-gray-500">GooglePay, PhonePe, Paytm</span>
              </div>
            </div>
            
            <div 
              onClick={() => setPaymentMethod("COD")}
              className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 transition ${paymentMethod === "COD" ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "hover:bg-gray-50"}`}
            >
              <FaMoneyBillWave className="text-green-600"/> 
              <div>
                <span className="font-bold text-sm block">Cash on Delivery</span>
                <span className="text-xs text-gray-500">Pay cash upon arrival</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={handleCheckout}
            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex justify-center items-center gap-2 text-lg"
          >
            <FaLock size={16} /> Pay ₹{finalTotal} & Place Order
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center gap-1">
             <FaLock size={10}/> 100% Secure Transaction
          </p>

        </div>
      </div>
    </div>
  );
};

export default Cart;