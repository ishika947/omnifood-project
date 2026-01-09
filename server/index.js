const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Models
const Food = require('./models/Food');
const Staff = require('./models/staff'); 
// Note: Booking model import kar rahe hain. 
// Agar aapke paas models/Booking.js nahi hai to bataiyega, hum bana denge.
const Booking = require('./models/Booking'); 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));

// --- ROUTES ---

// 1. GET: Fetch Menu (Foods)
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 2. POST: Book a Table (Customer Side)
app.post('/api/bookings', async (req, res) => {
  try {
    // Agar Booking model nahi banaya hai, toh ye line hata dein temporary
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json("Booking Failed");
  }
});

// 3. POST: Staff Registration (Only for Setup)
app.post('/api/staff/register', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 4. POST: Staff Login (Authentication Logic)
app.post('/api/staff/login', async (req, res) => {
  try {
    // A. Find user by username
    const user = await Staff.findOne({ username: req.body.username });
    
    // B. Check if user exists AND password matches
    if (!user || user.password !== req.body.password) {
      return res.status(400).json("Invalid Username or Password!");
    }

    // C. Update Last Login Time
    user.lastLogin = Date.now();
    await user.save();

    // D. Send User Data back (Exclude Password)
    res.status(200).json({ 
      username: user.username, 
      role: user.role, 
      name: user.name 
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));