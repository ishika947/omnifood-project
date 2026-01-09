import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/customer/login" : "/api/customer/register";
    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      localStorage.setItem("customer", JSON.stringify(res.data)); // Save Customer Session
      alert(isLogin ? "Welcome back!" : "Registration Successful!");
      navigate('/menu'); // Redirect to Menu
    } catch (err) {
      alert("Something went wrong! Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Customer Login" : "Create Account"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="text" placeholder="Phone Number" required className="w-full p-3 border rounded"
                onChange={e => setFormData({...formData, phone: e.target.value})} />
              <textarea placeholder="Delivery Address" required className="w-full p-3 border rounded"
                onChange={e => setFormData({...formData, address: e.target.value})} />
            </>
          )}
          <input type="email" placeholder="Email" required className="w-full p-3 border rounded"
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full p-3 border rounded"
            onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
            {isLogin ? "Login to Order" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 cursor-pointer hover:underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New to OmniFood? Create Account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;