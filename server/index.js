

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- IMPORT MODELS ---
const Food = require('./models/Food');
const Staff = require('./models/Staff');
const Booking = require('./models/Booking');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Table = require('./models/Table');
const Contact = require('./models/Contact'); // NEW: Contact Model

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// mongoose.connect("mongodb://127.0.0.1:27017/omnifood")
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.log("❌ DB Connection Error:", err));


mongoose.connect("mongodb+srv://admin:admin2702@cluster0.rfly8xf.mongodb.net/omnifood?retryWrites=true&w=majority")
  .then(() => console.log("✅ Cloud MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));
// ==========================================
//               API ROUTES
// ==========================================

// --- 1. FOOD & MENU ---
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) { res.status(500).json(error); }
});

// SEED MENU (Run once to add Thali, Noodles, etc.)
app.get('/api/seed-menu', async (req, res) => {
  try {
    await Food.deleteMany({}); 
    const newMenu = [
      { name: "Crispy Chilli Potato", category: "Starters", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80", originalPrice: 140, discountedPrice: 120, isSpecialOffer: false, rating: 4.5, description: "Spicy and crispy potatoes.", isVeg: true },
      { name: "Veg Hakka Noodles", category: "Starters", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&q=80", originalPrice: 120, discountedPrice: 99, isSpecialOffer: true, rating: 4.3, description: "Classic stir-fried noodles.", isVeg: true },
      { name: "Maharaja Special Thali", category: "Thali", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80", originalPrice: 350, discountedPrice: 299, isSpecialOffer: true, rating: 4.9, description: "Complete meal with Paneer, Dal, Roti, Rice.", isVeg: true },
      { name: "Paneer Butter Masala", category: "Main Course", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80", originalPrice: 240, discountedPrice: 240, isSpecialOffer: false, rating: 4.7, description: "Rich creamy gravy.", isVeg: true },
      { name: "Gulab Jamun", category: "Dessert", image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=600&q=80", originalPrice: 60, discountedPrice: 50, isSpecialOffer: false, rating: 4.8, description: "Sweet dumplings.", isVeg: true }
    ];
    await Food.insertMany(newMenu);
    res.send("✅ Menu Seeded Successfully!");
  } catch (error) { res.status(500).json("Error updating menu"); }
});

// --- 2. CUSTOMER ---
app.post('/api/customer/register', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) { res.status(500).json("Error"); }
});

app.post('/api/customer/login', async (req, res) => {
  try {
    const user = await Customer.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) return res.status(400).json("Invalid Credentials");
    res.status(200).json(user);
  } catch (error) { res.status(500).json(error); }
});

// --- 3. CONTACT US (NEW) ---
app.post('/api/contact', async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.status(201).json("Message Sent!");
  } catch (error) { res.status(500).json("Error"); }
});

app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) { res.status(500).json(error); }
});

// --- 4. STAFF & ADMIN ---
app.post('/api/staff/login', async (req, res) => {
  try {
    const user = await Staff.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) return res.status(400).json("Invalid!");
    user.lastLogin = Date.now();
    await user.save();
    res.status(200).json(user);
  } catch (error) { res.status(500).json(error); }
});

app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) { res.status(500).json(error); }
});

app.post('/api/staff/create', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) { res.status(500).json("Error"); }
});

// --- 5. ORDERS & TRACKING ---
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) { res.status(500).json(error); }
});

app.get('/api/orders/:email', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ date: -1 });
    res.json(orders);
  } catch (error) { res.status(500).json(error); }
});

// NEW: TRACK ORDER
app.get('/api/orders/track/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json("Order Not Found");
    res.json({ status: order.status }); 
  } catch (error) { res.status(500).json("Invalid Order ID"); }
});

// --- 6. TABLE BOOKING (ZONES) ---
app.get('/api/setup-tables', async (req, res) => {
  try {
    await Table.deleteMany({});
    const tables = [
      { tableNo: 1, seats: 2, location: "Window View" },
      { tableNo: 2, seats: 2, location: "Window View" },
      { tableNo: 3, seats: 2, location: "Private Booth" },
      { tableNo: 4, seats: 4, location: "Center Hall" },
      { tableNo: 5, seats: 4, location: "Outdoor Garden" },
      { tableNo: 6, seats: 4, location: "Outdoor Garden" },
      { tableNo: 7, seats: 6, location: "Family Lounge" },
      { tableNo: 8, seats: 6, location: "Private Booth" }
    ];
    await Table.insertMany(tables);
    res.send("✅ Tables Setup Complete!");
  } catch (err) { res.status(500).json(err); }
});

app.post('/api/bookings/check-status', async (req, res) => {
  try {
    const booked = await Booking.find({ date: req.body.date, time: req.body.time, status: { $ne: "Cancelled" } }).select('tableNo');
    const bookedIds = booked.map(b => b.tableNo);
    const tables = await Table.find().sort({ tableNo: 1 });
    const status = tables.map(t => ({ ...t._doc, status: bookedIds.includes(t.tableNo) ? "Booked" : "Available" }));
    res.json(status);
  } catch (error) { res.status(500).json("Error"); }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { tableNo, date, time } = req.body;
    const existing = await Booking.findOne({ tableNo, date, time, status: { $ne: "Cancelled" } });
    if (existing) return res.status(400).json("Table already booked!");
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) { res.status(500).json("Failed"); }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));