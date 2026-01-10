import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus("Message Sent! We will contact you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Contact Info (Black Side) */}
        <div className="bg-black text-white p-10 md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Let's Talk</h2>
            <p className="text-gray-400 mb-8">Have a query or feedback? We'd love to hear from you.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center"><FaPhone/></div>
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center"><FaEnvelope/></div>
                <p>hello@omnifood.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center"><FaMapMarkerAlt/></div>
                <p>Vijay Nagar, Indore</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs text-gray-500">© 2025 OmniFood Inc.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-10 md:w-3/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
              <input type="text" required className="w-full border p-3 rounded-lg focus:outline-none focus:border-orange-500" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" required className="w-full border p-3 rounded-lg focus:outline-none focus:border-orange-500" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows="4" required className="w-full border p-3 rounded-lg focus:outline-none focus:border-orange-500" 
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
            </div>
            
            {status && <p className="text-green-600 font-bold text-sm">{status}</p>}

            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 flex items-center justify-center gap-2 shadow-lg">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;