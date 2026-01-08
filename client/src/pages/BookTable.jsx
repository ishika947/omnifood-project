
import React, { useState } from 'react';
import axios from 'axios'; // For talking to the Backend
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookTable = () => {
  const navigate = useNavigate();

  // 1. State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    tableNumber: 1, // Default table
  });

  const [status, setStatus] = useState(null); // To show Success/Error messages

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission (The API Call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Connect to your Backend
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      
      if (response.status === 201) {
        setStatus('success');
        // Reset form after 2 seconds and go Home
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Book Your Table</h2>
        
        {/* Success Message */}
        {status === 'success' && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            🎉 Table Booked Successfully! Redirecting...
          </div>
        )}
        
        {/* Error Message */}
        {status === 'error' && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            ❌ Booking Failed. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Name</label>
              <input 
                type="text" name="name" required
                className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Phone</label>
              <input 
                type="tel" name="phone" required
                className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Date</label>
              <input 
                type="date" name="date" required
                className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Time</label>
              <input 
                type="time" name="time" required
                className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Guests & Table Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Guests</label>
              <input 
                type="number" name="guests" min="1" max="20"
                value={formData.guests} onChange={handleChange}
                className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Table No.</label>
              <select 
                name="tableNumber" onChange={handleChange}
                className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="1">Table 1 (Window View)</option>
                <option value="2">Table 2 (Private)</option>
                <option value="3">Table 3 (Family)</option>
                <option value="4">Table 4 (Outdoor)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded transition duration-300 transform hover:scale-105"
          >
            {status === 'loading' ? 'Booking...' : 'Confirm Reservation'}
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default BookTable;