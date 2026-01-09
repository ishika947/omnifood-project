import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // API Call to Backend
      const res = await axios.post("http://localhost:5000/api/staff/login", {
        username,
        password,
      });

      // Save User to Local Storage (Session)
      localStorage.setItem("user", JSON.stringify(res.data));
      
      // Redirect to Admin Dashboard
      navigate("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <div className="flex justify-center mb-4 text-orange-600 text-4xl">
          <FaUserShield />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Staff Portal</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <span className="text-red-500 text-sm font-bold text-center block">Wrong Username or Password!</span>}
          
          <button className="w-full bg-gray-800 text-white py-3 rounded hover:bg-black transition font-bold">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;