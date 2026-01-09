const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv'); // Abhi iski zaroorat nahi hai

// Import Models
const Food = require('./models/Food');
const Staff = require('./models/staff'); 
const Booking = require('./models/Booking'); 

// dotenv.config(); // Ise comment kar diya
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION (DIRECT FIX) ---
// Yahan humne process.env hata diya hai taaki "undefined" error na aaye
mongoose.connect("mongodb://127.0.0.1:27017/omnifood")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

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

// 2. POST: Book a Table
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json("Booking Failed");
  }
});

// 3. POST: Staff Registration
app.post('/api/staff/register', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 4. POST: Staff Login
app.post('/api/staff/login', async (req, res) => {
  try {
    const user = await Staff.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      return res.status(400).json("Invalid Username or Password!");
    }
    user.lastLogin = Date.now();
    await user.save();
    res.status(200).json({ 
      username: user.username, 
      role: user.role, 
      name: user.name 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// 5. UPDATE: Set Today's Special Offer
app.put('/api/foods/special/:id', async (req, res) => {
  try {
    await Food.updateMany({}, { isSpecialOffer: false });
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id, 
      { isSpecialOffer: true }, 
      { new: true }
    );
    res.json(updatedFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 6. POST: Place New Order
app.post('/api/orders', async (req, res) => {
  try {
    console.log("New Order Received:", req.body);
    res.status(201).json({ message: "Order Placed Successfully", orderId: Math.floor(Math.random() * 1000) });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ... Upar Login Route ke baad yeh add karein

// 7. GET: Get All Staff Members (For Admin Dashboard)
app.get('/api/staff', async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 8. POST: Create New Staff (Manager Adding Waiter)
app.post('/api/staff/create', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json("Error Creating Staff");
  }
});
const PORT = 5000; // Direct Port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));