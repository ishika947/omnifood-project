import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChair, FaUsers, FaArrowRight, FaClock } from 'react-icons/fa';

const BookTable = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Select Zone, 3: Select Table
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: 2, tableNo: null
  });

  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]); 
  const [selectedZone, setSelectedZone] = useState("");
  const [loading, setLoading] = useState(false);

  // --- IMAGES ---
  const zoneImages = {
    "Window View": "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=500&q=80",
    "Private Booth": "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=500&q=80",
    "Outdoor Garden": "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80",
    "Center Hall": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    "Family Lounge": "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&q=80"
  };

  // --- NEW: GENERATE ALL TIME SLOTS (10 AM to 10 PM) ---
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 10; i <= 22; i++) {
      const timeString = i < 10 ? `0${i}:00` : `${i}:00`;
      // Convert to 12 Hour format for display
      const displayTime = i > 12 ? `${i - 12}:00 PM` : i === 12 ? "12:00 PM" : `${i}:00 AM`;
      slots.push({ value: timeString, label: displayTime });
    }
    return slots;
  };

  // --- NEW: VALIDATION FUNCTION ---
  const validateForm = () => {
    // 1. Phone Number Check (Must be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("⚠️ Invalid Phone Number! Please enter exactly 10 digits.");
      return false;
    }

    // 2. Email Check (Basic Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("⚠️ Invalid Email! Please enter a valid email address.");
      return false;
    }

    // 3. Name Check
    if (formData.name.trim().length < 3) {
      alert("⚠️ Name is too short!");
      return false;
    }

    return true;
  };

  // --- STEP 1 CHECK ---
  const checkAvailability = async (e) => {
    e.preventDefault();
    
    // Validate before calling API
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/bookings/check-status', {
        date: formData.date,
        time: formData.time
      });

      if (res.data.length === 0) {
        alert("Please run setup-tables route first!");
        setLoading(false);
        return;
      }

      setTables(res.data);
      setStep(2); // Go to Image Selection
    } catch (err) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // --- HELPERS ---
  const availableZones = [...new Set(tables
    .filter(t => t.seats >= formData.guests)
    .map(t => t.location)
  )];

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    const specificTables = tables.filter(t => t.location === zone && t.seats >= formData.guests);
    setFilteredTables(specificTables);
    setStep(3);
  };

  const handleBooking = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      alert(`🎉 Table ${formData.tableNo} (${selectedZone}) Booked Successfully!`);
      navigate('/');
    } catch (err) {
      alert("Booking Failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <div className="bg-black text-white p-8 md:w-1/4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Omni Booking</h2>
            <div className="space-y-4">
               <div className={`flex items-center gap-3 ${step >= 1 ? "text-orange-500" : "text-gray-500"}`}>
                 <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">1</div>
                 <span>Details</span>
               </div>
               <div className={`flex items-center gap-3 ${step >= 2 ? "text-orange-500" : "text-gray-500"}`}>
                 <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">2</div>
                 <span>Select Zone</span>
               </div>
               <div className={`flex items-center gap-3 ${step >= 3 ? "text-orange-500" : "text-gray-500"}`}>
                 <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">3</div>
                 <span>Confirm</span>
               </div>
            </div>
          </div>
          
          {step > 1 && (
            <div className="bg-gray-800 p-4 rounded-xl text-sm mt-4">
              <p className="text-gray-400 text-xs uppercase">Summary:</p>
              <p className="font-bold text-lg text-white">{formData.guests} Guests</p>
              <p className="text-gray-300">{formData.date}</p>
              <p className="text-orange-400 flex items-center gap-1"><FaClock/> {formData.time}</p>
            </div>
          )}
        </div>

        {/* MAIN AREA */}
        <div className="p-8 md:w-3/4 bg-gray-50">
          
          {/* STEP 1: FORM WITH VALIDATION */}
          {step === 1 && (
            <form onSubmit={checkAvailability} className="max-w-md mx-auto space-y-4 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Find Your Table</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-bold text-gray-500 ml-1">Date</label>
                   <input type="date" required className="w-full border p-3 rounded-lg" 
                     onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-500 ml-1">Time</label>
                   <select required className="w-full border p-3 rounded-lg bg-white" 
                     onChange={e => setFormData({...formData, time: e.target.value})}>
                      <option value="">Select Time</option>
                      {generateTimeSlots().map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                   </select>
                </div>
              </div>

              <div className="relative">
                <FaUsers className="absolute top-4 left-3 text-gray-400"/>
                <input type="number" min="1" max="10" placeholder="Number of Guests" required 
                  className="w-full border p-3 pl-10 rounded-lg" 
                  value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} />
              </div>

              <input type="text" placeholder="Your Full Name" required 
                className="w-full border p-3 rounded-lg" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
              
              <input type="tel" placeholder="Phone Number (10 Digits)" required 
                maxLength="10" 
                className="w-full border p-3 rounded-lg" 
                onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
                value={formData.phone}
              />
              
              <input type="email" placeholder="Email Address" required 
                className="w-full border p-3 rounded-lg" 
                onChange={e => setFormData({...formData, email: e.target.value})} />
              
              <button className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold hover:bg-orange-700 shadow-lg transition transform hover:-translate-y-1">
                {loading ? "Verifying..." : "Search Available Tables"}
              </button>
            </form>
          )}

          {/* STEP 2: SELECT ZONE */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Ambience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableZones.length > 0 ? availableZones.map((zone) => (
                  <div 
                    key={zone} 
                    onClick={() => handleZoneSelect(zone)}
                    className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <img src={zoneImages[zone] || zoneImages["Center Hall"]} alt={zone} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{zone}</h3>
                      <p className="text-xs opacity-90 flex items-center gap-1">Tap to select <FaArrowRight/></p>
                    </div>
                  </div>
                )) : (
                   <div className="col-span-2 text-center py-10 bg-white rounded-xl shadow">
                      <p className="text-red-500 font-bold">No tables available for {formData.guests} guests in any zone.</p>
                      <button onClick={() => setStep(1)} className="text-blue-500 underline text-sm mt-2">Try different time/guests</button>
                   </div>
                )}
              </div>
              <button onClick={() => setStep(1)} className="mt-6 text-gray-500 font-bold text-sm">← Back to Form</button>
            </div>
          )}

          {/* STEP 3: SELECT TABLE */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pick a Table in {selectedZone}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredTables.map((table) => (
                  <button
                    key={table.tableNo}
                    disabled={table.status === "Booked"}
                    onClick={() => setFormData({...formData, tableNo: table.tableNo})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition relative ${
                      table.status === "Booked" ? "bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed" :
                      formData.tableNo === table.tableNo ? "bg-orange-600 border-orange-600 text-white scale-105 shadow-xl" :
                      "bg-white border-gray-200 hover:border-orange-400 hover:shadow-md"
                    }`}
                  >
                    <FaChair size={24} />
                    <span className="font-bold">Table {table.tableNo}</span>
                    <span className="text-xs">{table.seats} Seats</span>
                    {table.status === "Booked" && (
                        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" title="Booked"></span>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 flex gap-4">
                <button onClick={() => setStep(2)} className="px-6 py-3 border rounded-lg font-bold text-gray-600">Change Zone</button>
                <button 
                  disabled={!formData.tableNo}
                  onClick={handleBooking}
                  className={`flex-1 py-3 rounded-lg font-bold text-white transition ${
                    formData.tableNo ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookTable;