const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  tableNo: { type: Number, required: true }, // Yeh line sabse zaroori hai!
  status: { type: String, default: "Pending" } // Pending, Confirmed, Cancelled
});

module.exports = mongoose.model('Booking', BookingSchema);