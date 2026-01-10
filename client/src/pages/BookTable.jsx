import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChair, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaBell, FaFilter, FaMapMarkerAlt } from 'react-icons/fa';

const BookTable = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: 2, tableNo: null
  });

  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]); // Filtered list ke liye
  const [selectedCategory, setSelectedCategory] = useState("All"); // 2, 4, 6, or All
  
  const [loading, setLoading] = useState(false);
  const [waitlistMode, setWaitlistMode] = useState(false);

  // --- STEP 1: LOAD TABLES ---
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

      if (res.data.length === 0) {
        alert("⚠️ Database empty! Run setup URL first.");
        setLoading(false);
        return;
      }

      setTables(res.data);
      setFilteredTables(res.data); // Shuru mein sab dikhao
      setStep(2); 
      
      const allFull = res.data.every(t => t.status === "Booked");
      setWaitlistMode(allFull);

    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  // --- FILTER LOGIC (NEW) ---
  const handleFilter = (seats) => {
    setSelectedCategory(seats);
    if (seats === "All") {
      setFilteredTables(tables);
    } else {
      // Filter tables strictly by seat count
      const filtered = tables.filter(t => t.seats === seats);
      setFilteredTables(filtered);
    }
    setFormData({ ...formData, tableNo: null }); // Reset selection when filter changes
  };

  // --- BOOKING LOGIC ---
  const handleBooking = async () => {
    if (!formData.tableNo) return alert("Please select a table!");

    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      alert(`🎉 Table ${formData.tableNo} Booked Successfully!`);
      navigate('/');
    } catch (err) {
      alert("Booking Failed! Try again.");
      checkAvailability({ preventDefault: () => {} });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-center">
      <div className="bg-white max-w-5xl w-full p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* LEFT: FORM */}
        <div className="md:w-1/3 space-y-4 border-r pr-6">
          <h2 className="text-2xl font-bold text-gray-800">Book A Table</h2>
          <p className="text-gray-500 text-sm">Select date & time to find your perfect spot.</p>
          
          <form onSubmit={checkAvailability} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-600">Date</label>
              <input type="date" required className="w-full border p-2 rounded" 
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600">Time</label>
              <select required className="w-full border p-2 rounded" 
                value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                <option value="">Select Time</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="19:00">07:00 PM</option>
                <option value="20:00">08:00 PM</option>
                <option value="21:00">09:00 PM</option>
              </select>
            </div>
            {/* User details inputs... */}
            <input type="text" placeholder="Name" required className="w-full border p-2 rounded"
               value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email" required className="w-full border p-2 rounded"
               value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone" required className="w-full border p-2 rounded"
               value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />

            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800">
              {loading ? "Checking..." : "Check Availability"}
            </button>
          </form>
        </div>

        {/* RIGHT: VISUAL MAP WITH FILTERS */}
        <div className="md:w-2/3 flex flex-col items-center bg-gray-100 rounded-xl p-6 relative min-h-[400px]">
          
          {step === 1 && (
            <div className="text-center text-gray-400 mt-20">
              <FaCalendarAlt className="text-6xl mx-auto mb-4 opacity-20"/>
              <p>Select Date & Time to view Layout</p>
            </div>
          )}

          {step === 2 && (
            <>
              {/* --- NEW: FILTER BUTTONS --- */}
              <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-full shadow-sm">
                <button onClick={() => handleFilter("All")} className={`px-4 py-1 rounded-full text-sm font-bold ${selectedCategory === "All" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>All</button>
                <button onClick={() => handleFilter(2)} className={`px-4 py-1 rounded-full text-sm font-bold ${selectedCategory === 2 ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>2 Seater</button>
                <button onClick={() => handleFilter(4)} className={`px-4 py-1 rounded-full text-sm font-bold ${selectedCategory === 4 ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>4 Seater</button>
                <button onClick={() => handleFilter(6)} className={`px-4 py-1 rounded-full text-sm font-bold ${selectedCategory === 6 ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Family (6+)</button>
              </div>

              {/* TABLE GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {filteredTables.length > 0 ? (
                  filteredTables.map((table) => (
                    <button
                      key={table.tableNo}
                      disabled={table.status === "Booked"}
                      onClick={() => setFormData({...formData, tableNo: table.tableNo, guests: table.seats})}
                      className={`relative h-28 rounded-2xl flex flex-col justify-center items-center border-2 transition-all shadow-sm
                        ${table.status === "Booked" ? "bg-gray-200 border-gray-300 opacity-50 cursor-not-allowed" : 
                          formData.tableNo === table.tableNo ? "bg-orange-100 border-orange-600 ring-2 ring-orange-600 scale-105" : 
                          "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md"}`}
                    >
                      {/* Location Badge (Window/Private) */}
                      <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wide text-gray-400 bg-gray-100 px-1 rounded">
                         {table.location || "General"}
                      </span>

                      <div className="flex items-center gap-1 mt-2">
                        <FaChair className={table.status === "Booked" ? "text-gray-400" : "text-gray-700"} />
                        <span className="font-bold text-lg">T-{table.tableNo}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <FaMapMarkerAlt size={10}/> {table.seats} Seats
                      </div>

                      {table.status === "Booked" && (
                         <span className="absolute inset-0 flex items-center justify-center bg-gray-500/10 rounded-2xl font-bold text-red-600 text-xs rotate-12">BOOKED</span>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-400 mt-10">No tables found for {selectedCategory} people.</p>
                )}
              </div>

              {/* CONFIRM BUTTON */}
              {!waitlistMode && (
                <button 
                  onClick={handleBooking} 
                  disabled={!formData.tableNo}
                  className={`mt-8 w-full py-4 rounded-xl font-bold text-white transition shadow-lg ${
                    formData.tableNo ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {formData.tableNo ? `Confirm Table ${formData.tableNo} (${formData.guests} Guests)` : "Select a Table to Proceed"}
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