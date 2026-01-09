import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaClock, FaCheckCircle, FaUtensils } from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (!customer) {
      navigate('/auth'); // Redirect if not logged in
    } else {
      fetchOrders(customer.email);
    }
  }, []);

  const fetchOrders = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${email}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center flex justify-center items-center gap-2">
        <FaBoxOpen className="text-orange-600"/> My Order History
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length === 0 ? (
           <p className="text-center text-gray-500">No orders found. Go eat something! 🍔</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Order ID: {order._id.slice(-6)}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <FaClock/> {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-700">
                    <span className="flex items-center gap-2"><FaUtensils className="text-gray-300"/> {item.name} <span className="text-xs text-gray-400">x{item.qty}</span></span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-orange-600">₹{order.totalAmount}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;