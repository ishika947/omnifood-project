const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- IMPORT MODELS ---
const Food = require('./models/Food');
const Staff = require('./models/staff');
const Booking = require('./models/Booking');
const Customer = require('./models/Customer'); // NEW: Customer Model

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// Using Direct Local Link (No .env needed for Viva)
mongoose.connect("mongodb://127.0.0.1:27017/omnifood")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ==========================================
//               API ROUTES
// ==========================================

// --- 1. FOOD & MENU ROUTES ---

// Get All Foods
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Special Offer (Admin Feature)
app.put('/api/foods/special/:id', async (req, res) => {
  try {
    // Reset all offers first
    await Food.updateMany({}, { isSpecialOffer: false });
    
    // Set new offer
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

// --- 2. CUSTOMER ROUTES (NEW) ---

// Customer Signup
app.post('/api/customer/register', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    // Likely duplicate email error
    res.status(500).json("Email already exists or Server Error");
  }
});

// Customer Login
app.post('/api/customer/login', async (req, res) => {
  try {
    const user = await Customer.findOne({ email: req.body.email });
    
    // Simple Password Check (No Encryption for College Project)
    if (!user || user.password !== req.body.password) {
      return res.status(400).json("Invalid Credentials");
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// --- 3. STAFF & ADMIN ROUTES ---

// Staff Login
app.post('/api/staff/login', async (req, res) => {
  try {
    const user = await Staff.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      return res.status(400).json("Invalid Username or Password!");
    }
    // Update Attendance Time
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

// Get All Staff (For Admin Dashboard)
app.get('/api/staff', async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create New Staff (Manager Action)
app.post('/api/staff/create', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json("Error Creating Staff");
  }
});

// --- 4. ORDER & BOOKING ROUTES ---

// Place New Order (Cart Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    // In a real app, we would save to an Order Model here.
    // For now, we log it to console to show the client "Backend is receiving data".
    console.log("📦 New Order Received!");
    console.log("Items:", req.body.items);
    console.log("Total:", req.body.total);
    
    res.status(201).json({ 
      message: "Order Placed Successfully", 
      orderId: Math.floor(Math.random() * 10000) 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Book a Table
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json("Booking Failed");
  }
});

// --- START SERVER ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));