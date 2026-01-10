// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // --- IMPORT MODELS ---
// const Food = require('./models/Food');
// const Staff = require('./models/Staff');
// const Booking = require('./models/Booking');
// const Customer = require('./models/Customer');
// const Order = require('./models/Order');
// const Table = require('./models/Table'); // Table Model

// const app = express();

// // --- MIDDLEWARE ---
// app.use(cors());
// app.use(express.json());

// // --- DATABASE CONNECTION ---
// mongoose.connect("mongodb://127.0.0.1:27017/omnifood")
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.log("❌ DB Connection Error:", err));

// // ==========================================
// //               API ROUTES
// // ==========================================

// // --- 1. FOOD & MENU ROUTES ---

// // Get All Foods
// app.get('/api/foods', async (req, res) => {
//   try {
//     const foods = await Food.find();
//     res.json(foods);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // Update Special Offer (Admin Feature)
// app.put('/api/foods/special/:id', async (req, res) => {
//   try {
//     await Food.updateMany({}, { isSpecialOffer: false }); 
//     const updatedFood = await Food.findByIdAndUpdate(
//       req.params.id, 
//       { isSpecialOffer: true }, 
//       { new: true }
//     );
//     res.json(updatedFood);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // --- 2. CUSTOMER ROUTES ---

// // Signup
// app.post('/api/customer/register', async (req, res) => {
//   try {
//     const newCustomer = new Customer(req.body);
//     await newCustomer.save();
//     res.status(201).json(newCustomer);
//   } catch (error) {
//     res.status(500).json("Email already exists or Server Error");
//   }
// });

// // Login
// app.post('/api/customer/login', async (req, res) => {
//   try {
//     const user = await Customer.findOne({ email: req.body.email });
//     if (!user || user.password !== req.body.password) {
//       return res.status(400).json("Invalid Credentials");
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // --- 3. STAFF & ADMIN ROUTES ---

// // Staff Login
// app.post('/api/staff/login', async (req, res) => {
//   try {
//     const user = await Staff.findOne({ username: req.body.username });
//     if (!user || user.password !== req.body.password) {
//       return res.status(400).json("Invalid Username or Password!");
//     }
//     user.lastLogin = Date.now();
//     await user.save();
    
//     res.status(200).json({ 
//       username: user.username, 
//       role: user.role, 
//       name: user.name 
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // Get All Staff
// app.get('/api/staff', async (req, res) => {
//   try {
//     const staffMembers = await Staff.find();
//     res.json(staffMembers);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // Create Staff
// app.post('/api/staff/create', async (req, res) => {
//   try {
//     const newStaff = new Staff(req.body);
//     await newStaff.save();
//     res.status(201).json(newStaff);
//   } catch (error) {
//     res.status(500).json("Error Creating Staff");
//   }
// });

// // --- 4. ORDER ROUTES ---

// // Place Order
// app.post('/api/orders', async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     console.log("📦 Order Saved:", savedOrder._id);
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // Get Order History
// app.get('/api/orders/:email', async (req, res) => {
//   try {
//     const orders = await Order.find({ customerEmail: req.params.email }).sort({ date: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // --- 5. ADVANCED TABLE BOOKING (UPDATED FOR ZONES) ---

// // A. SETUP TABLES (Must Run Once to Update Categories)
// app.get('/api/setup-tables', async (req, res) => {
//   try {
//     // 1. Clear old tables to prevent duplicates/confusion
//     await Table.deleteMany({}); 

//     // 2. Insert New Tables with Visual Locations
//     const tables = [
//       // 2 Seaters
//       { tableNo: 1, seats: 2, location: "Window View" },
//       { tableNo: 2, seats: 2, location: "Window View" },
//       { tableNo: 3, seats: 2, location: "Private Booth" },
      
//       // 4 Seaters
//       { tableNo: 4, seats: 4, location: "Center Hall" },
//       { tableNo: 5, seats: 4, location: "Outdoor Garden" },
//       { tableNo: 6, seats: 4, location: "Outdoor Garden" },

//       // 6 Seaters
//       { tableNo: 7, seats: 6, location: "Family Lounge" },
//       { tableNo: 8, seats: 6, location: "Private Booth" }
//     ];

//     await Table.insertMany(tables);
//     return res.send("✅ Tables Reset & Updated with Categories (Window, Outdoor, Private)!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // B. Check Table Status (Returns list of available tables)
// app.post('/api/bookings/check-status', async (req, res) => {
//   const { date, time } = req.body;
//   try {
//     // 1. Find Booked Tables for this Slot
//     const bookedTables = await Booking.find({ 
//       date: date, 
//       time: time,
//       status: { $ne: "Cancelled" } 
//     }).select('tableNo');

//     const bookedTableNumbers = bookedTables.map(b => b.tableNo);

//     // 2. Get All Tables & Mark Status
//     const allTables = await Table.find().sort({ tableNo: 1 });
//     const tableStatus = allTables.map(table => {
//       const isBooked = bookedTableNumbers.includes(table.tableNo);
//       return {
//         ...table._doc,
//         status: isBooked ? "Booked" : "Available"
//       };
//     });

//     res.json(tableStatus);
//   } catch (error) {
//     res.status(500).json("Error checking tables");
//   }
// });

// // C. Final Booking API
// app.post('/api/bookings', async (req, res) => {
//   try {
//     const { tableNo, date, time } = req.body;
    
//     // Safety Check: Is it still free?
//     const existing = await Booking.findOne({ tableNo, date, time, status: { $ne: "Cancelled" } });
//     if (existing) {
//       return res.status(400).json("⚠️ Sorry! This table was just booked by someone else.");
//     }

//     const newBooking = new Booking(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (error) {
//     res.status(500).json("Booking Failed");
//   }
// });

// // --- START SERVER ---
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



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

// A. Get All Foods
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json(error);
  }
});

// B. SEED MENU (Run this URL to Add Noodles, Thali, Chilli Potato etc.)
app.get('/api/seed-menu', async (req, res) => {
  try {
    await Food.deleteMany({}); // Clear old menu

    const newMenu = [
      // --- STARTERS ---
      {
        name: "Crispy Chilli Potato",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
        originalPrice: 140,
        discountedPrice: 120,
        isSpecialOffer: false,
        rating: 4.5,
        description: "Spicy and crispy potatoes tossed in sweet chilli sauce.",
        isVeg: true
      },
      {
        name: "Veg Hakka Noodles",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&q=80",
        originalPrice: 120,
        discountedPrice: 99,
        isSpecialOffer: true,
        rating: 4.3,
        description: "Classic stir-fried noodles with fresh vegetables.",
        isVeg: true
      },
      {
        name: "Paneer Tikka",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
        originalPrice: 220,
        discountedPrice: 200,
        isSpecialOffer: false,
        rating: 4.8,
        description: "Marinated cottage cheese grilled to perfection.",
        isVeg: true
      },

      // --- SPECIAL THALI ---
      {
        name: "Maharaja Special Thali",
        category: "Thali",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80",
        originalPrice: 350,
        discountedPrice: 299,
        isSpecialOffer: true,
        rating: 4.9,
        description: "Complete meal with Paneer, Dal, 3 Rotis, Rice, Sweet & Salad.",
        isVeg: true
      },
      {
        name: "Mini Lunch Thali",
        category: "Thali",
        image: "https://t4.ftcdn.net/jpg/02/75/39/13/360_F_275391367_GkO5yS6h15D7v7c9a6o6c9a6o6c9a6o6c9a6o6c9a6o6c9a6o6.jpg",
        originalPrice: 180,
        discountedPrice: 150,
        isSpecialOffer: false,
        rating: 4.2,
        description: "Budget meal with Dal, Veg Sabji, 2 Rotis and Rice.",
        isVeg: true
      },

      // --- MAIN COURSE ---
      {
        name: "Paneer Butter Masala",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
        originalPrice: 240,
        discountedPrice: 240,
        isSpecialOffer: false,
        rating: 4.7,
        description: "Rich and creamy paneer gravy served best with Naan.",
        isVeg: true
      },
      {
        name: "Dal Makhani",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
        originalPrice: 190,
        discountedPrice: 190,
        isSpecialOffer: false,
        rating: 4.6,
        description: "Slow-cooked black lentils with butter and cream.",
        isVeg: true
      },

      // --- DESSERT ---
      {
        name: "Gulab Jamun (2 pcs)",
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=600&q=80",
        originalPrice: 60,
        discountedPrice: 50,
        isSpecialOffer: false,
        rating: 4.8,
        description: "Soft milk dumplings soaked in rose sugar syrup.",
        isVeg: true
      }
    ];

    await Food.insertMany(newMenu);
    res.send("✅ Menu Updated with Chilli Potato, Noodles & Thali!");
  } catch (error) {
    res.status(500).json("Error updating menu");
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


// --- 5. ADVANCED TABLE BOOKING & ZONES ---

// A. SETUP TABLES (Creates Window, Private, Outdoor Tables)
app.get('/api/setup-tables', async (req, res) => {
  try {
    // 1. Clear old tables
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