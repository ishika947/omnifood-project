import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChair, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaBell } from 'react-icons/fa';

const BookTable = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Date/Time, Step 2: Select Table
  
  // Form Data
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: 2, tableNo: null
  });

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [waitlistMode, setWaitlistMode] = useState(false);

  // --- STEP 1: LOAD TABLES BASED ON TIME ---
  const checkAvailability = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      alert("Please select Date and Time first!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/bookings/check-status', {
        date: formData.date,
        time: formData.time
      });
      setTables(res.data);
      setStep(2); // Move to Table Selection
      
      // Check if ALL tables are booked
      const allFull = res.data.every(t => t.status === "Booked");
      if (allFull) setWaitlistMode(true);
      else setWaitlistMode(false);

    } catch (err) {
      console.error(err);
      alert("Error checking availability");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: SUBMIT BOOKING ---
  const handleBooking = async () => {
    if (!formData.tableNo) {
      alert("Please select a table (Green ones)!");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      alert(`🎉 Table ${formData.tableNo} Booked Successfully! See you soon.`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data || "Booking Failed");
      // Refresh tables if booking failed (maybe someone else took it)
      checkAvailability({ preventDefault: () => {} });
    }
  };

  const handleJoinWaitlist = () => {
    // Basic Waitlist Logic (Simulated)
    const email = prompt("All tables are full! Enter your email to get notified when a table clears:");
    if (email) {
      alert("✅ You are added to the Priority Waitlist! We will email you instantly when a spot opens.");
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-center">
      <div className="bg-white max-w-4xl w-full p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* LEFT: FORM DETAILS */}
        <div className="md:w-1/3 space-y-4 border-r pr-6">
          <h2 className="text-2xl font-bold text-gray-800">Book A Table</h2>
          <p className="text-gray-500 text-sm">Select your preferences to see live availability.</p>
          
          <form onSubmit={checkAvailability} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Date</label>
              <input type="date" required className="w-full border p-2 rounded" 
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Time</label>
              <select required className="w-full border p-2 rounded" 
                value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                <option value="">Select Time</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="19:00">07:00 PM</option>
                <option value="20:00">08:00 PM</option>
                <option value="21:00">09:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Details</label>
              <input type="text" placeholder="Name" required className="w-full border p-2 rounded mb-2"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email" required className="w-full border p-2 rounded mb-2"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="tel" placeholder="Phone" required className="w-full border p-2 rounded"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition flex justify-center items-center gap-2">
              {loading ? "Checking..." : "Check Availability"}
            </button>
          </form>
        </div>

        {/* RIGHT: VISUAL TABLE MAP (MOVIE STYLE) */}
        <div className="md:w-2/3 flex flex-col justify-center items-center bg-gray-100 rounded-xl p-6 relative">
          
          {step === 1 && (
            <div className="text-center text-gray-400">
              <FaCalendarAlt className="text-6xl mx-auto mb-4 opacity-20"/>
              <p>Select Date & Time to view the Layout</p>
            </div>
          )}

          {step === 2 && (
            <>
              <h3 className="text-lg font-bold mb-6 w-full text-left flex justify-between">
                <span>Select Your Table</span>
                <span className="text-xs font-normal bg-white px-2 py-1 rounded border flex gap-2">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Free</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-400 rounded-full"></div> Booked</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Selected</span>
                </span>
              </h3>

              {/* TABLE GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {tables.map((table) => (
                  <button
                    key={table.tableNo}
                    disabled={table.status === "Booked"}
                    onClick={() => setFormData({...formData, tableNo: table.tableNo})}
                    className={`relative w-24 h-24 rounded-2xl flex flex-col justify-center items-center border-4 transition-all transform hover:scale-105 shadow-sm
                      ${table.status === "Booked" ? "bg-gray-200 border-gray-300 cursor-not-allowed opacity-60" : 
                        formData.tableNo === table.tableNo ? "bg-orange-100 border-orange-500 text-orange-600 scale-110 shadow-lg" : 
                        "bg-white border-green-400 hover:bg-green-50 cursor-pointer"}`}
                  >
                    <FaChair size={24} className={table.status === "Booked" ? "text-gray-400" : "text-gray-700"} />
                    <span className="font-bold mt-1 text-sm">T-{table.tableNo}</span>
                    <span className="text-[10px] text-gray-500">{table.seats} Seats</span>
                    
                    {/* Status Label (If Full) */}
                    {table.status === "Booked" && (
                       <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                         FULL
                       </span>
                    )}
                  </button>
                ))}
              </div>

              {/* ACTION BUTTONS */}
              {waitlistMode ? (
                <div className="text-center space-y-3">
                   <p className="text-red-500 font-bold flex items-center justify-center gap-2">
                     <FaTimesCircle/> All tables are full at this time.
                   </p>
                   <button onClick={handleJoinWaitlist} className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 animate-pulse flex items-center gap-2 mx-auto">
                     <FaBell/> Notify Me When Available
                   </button>
                </div>
              ) : (
                <button 
                  onClick={handleBooking} 
                  disabled={!formData.tableNo}
                  className={`w-full py-3 rounded-xl font-bold text-white transition shadow-lg ${
                    formData.tableNo ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Confirm Booking (Table {formData.tableNo || "?"})
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookTable;