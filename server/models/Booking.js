const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  // Link this booking to a specific user
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  // (We will uncomment the user line later when we add Login system)

  name: { type: String, required: true }, // Customer Name
  phone: { type: String, required: true },
  
  tableNumber: { type: Number, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // HH:MM
  guests: { type: Number, required: true },
  
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' 
  },
  
  // --- UNIQUE FEATURE: Pre-ordering Food ---
  preOrderItems: [
    {
      foodName: { type: String },
      quantity: { type: Number }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);