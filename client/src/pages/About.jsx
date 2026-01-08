import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      
      {/* 1. Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Experience <span className="text-orange-600">OmniFood Prime</span></h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Located in the heart of the city, we offer a serene dining experience with a blend of modern architecture and nature.
        </p>
      </div>

      {/* 2. Photo Gallery (Ambiance/Space) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-6xl mx-auto">
        {/* Large Image */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-lg"
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Smaller Side Images */}
        <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl shadow-lg h-64">
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" alt="Outdoor View" className="w-full h-full object-cover"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl shadow-lg h-64">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=800&q=80" alt="Private Dining" className="w-full h-full object-cover"/>
        </motion.div>
      </div>

      {/* 3. Location & Contact Info */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center shadow-2xl">
        
        {/* Details */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-orange-500">Visit Us</h2>
          
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-2xl text-orange-500 mt-1" />
            <div>
              <p className="font-bold text-lg">Indore, Madhya Pradesh</p>
              <p className="text-gray-400">101, Vijay Nagar Square, Near C21 Mall.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaClock className="text-2xl text-orange-500" />
            <div>
              <p className="font-bold">11:00 AM - 11:00 PM</p>
              <p className="text-gray-400">Open All Days</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-2xl text-orange-500" />
            <p className="font-bold text-lg">+91 98765 43210</p>
          </div>
        </div>

        {/* Embedded Map (Google Maps Embed) */}
        <div className="flex-1 w-full h-64 rounded-xl overflow-hidden border-4 border-gray-700">
           <iframe 
             title="map"
             width="100%" 
             height="100%" 
             frameBorder="0" 
             scrolling="no" 
             marginHeight="0" 
             marginWidth="0" 
             src="https://maps.google.com/maps?q=Vijay+Nagar+Indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
           ></iframe>
        </div>
      </div>

    </div>
  );
};

export default About;