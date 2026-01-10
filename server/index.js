const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- IMPORT MODELS ---
const Food = require('./models/Food');
const Staff = require('./models/Staff');
const Booking = require('./models/Booking');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Table = require('./models/Table'); // Table Model

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
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

// --- 2. CUSTOMER ROUTES ---

// Signup
app.post('/api/customer/register', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json("Email already exists or Server Error");
  }
});

// Login
app.post('/api/customer/login', async (req, res) => {
  try {
    const user = await Customer.findOne({ email: req.body.email });
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

// Get All Staff
app.get('/api/staff', async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create Staff
app.post('/api/staff/create', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json("Error Creating Staff");
  }
});

// --- 4. ORDER ROUTES ---

// Place Order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    console.log("📦 Order Saved:", savedOrder._id);
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Order History
app.get('/api/orders/:email', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// --- 5. ADVANCED TABLE BOOKING (UPDATED FOR ZONES) ---

// A. SETUP TABLES (Must Run Once to Update Categories)
app.get('/api/setup-tables', async (req, res) => {
  try {
    // 1. Clear old tables to prevent duplicates/confusion
    await Table.deleteMany({}); 

    // 2. Insert New Tables with Visual Locations
    const tables = [
      // 2 Seaters
      { tableNo: 1, seats: 2, location: "Window View" },
      { tableNo: 2, seats: 2, location: "Window View" },
      { tableNo: 3, seats: 2, location: "Private Booth" },
      
      // 4 Seaters
      { tableNo: 4, seats: 4, location: "Center Hall" },
      { tableNo: 5, seats: 4, location: "Outdoor Garden" },
      { tableNo: 6, seats: 4, location: "Outdoor Garden" },

      // 6 Seaters
      { tableNo: 7, seats: 6, location: "Family Lounge" },
      { tableNo: 8, seats: 6, location: "Private Booth" }
    ];

    await Table.insertMany(tables);
    return res.send("✅ Tables Reset & Updated with Categories (Window, Outdoor, Private)!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// B. Check Table Status (Returns list of available tables)
app.post('/api/bookings/check-status', async (req, res) => {
  const { date, time } = req.body;
  try {
    // 1. Find Booked Tables for this Slot
    const bookedTables = await Booking.find({ 
      date: date, 
      time: time,
      status: { $ne: "Cancelled" } 
    }).select('tableNo');

    const bookedTableNumbers = bookedTables.map(b => b.tableNo);

    // 2. Get All Tables & Mark Status
    const allTables = await Table.find().sort({ tableNo: 1 });
    const tableStatus = allTables.map(table => {
      const isBooked = bookedTableNumbers.includes(table.tableNo);
      return {
        ...table._doc,
        status: isBooked ? "Booked" : "Available"
      };
    });

    res.json(tableStatus);
  } catch (error) {
    res.status(500).json("Error checking tables");
  }
});

// C. Final Booking API
app.post('/api/bookings', async (req, res) => {
  try {
    const { tableNo, date, time } = req.body;
    
    // Safety Check: Is it still free?
    const existing = await Booking.findOne({ tableNo, date, time, status: { $ne: "Cancelled" } });
    if (existing) {
      return res.status(400).json("⚠️ Sorry! This table was just booked by someone else.");
    }

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