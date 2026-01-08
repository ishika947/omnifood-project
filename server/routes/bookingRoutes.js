const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// 1. CREATE A NEW BOOKING (User books a table)
router.post('/', async (req, res) => {
  try {
    // We receive table details AND pre-order food list here
    const { name, phone, tableNumber, date, time, guests, preOrderItems } = req.body;

    const newBooking = new Booking({
      name,
      phone,
      tableNumber,
      date,
      time,
      guests,
      preOrderItems // This array stores the food they ordered in advance
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Table Booked Successfully!", booking: savedBooking });
  } catch (error) {
    res.status(400).json({ message: "Booking Failed", error: error.message });
  }
});

// 2. CHECK AVAILABILITY (Simple logic for now)
router.post('/check-availability', async (req, res) => {
  const { date, time } = req.body;
  // Unique Logic: Count how many bookings exist for this slot
  const count = await Booking.countDocuments({ date, time });
  
  if(count < 10) { // Assuming restaurant has 10 tables
    res.json({ available: true, message: "Tables available!" });
  } else {
    res.json({ available: false, message: "Fully booked for this time." });
  }
});

module.exports = router;