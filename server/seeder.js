const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');
const Staff = require('./models/staff');
const connectDB = require('./db'); // Ensure you have db.js or replace with connection code

dotenv.config();

// Connect to Database
connectDB();

// 1. Food Data (Menu)
const sampleFoods = [
  {
    name: "Maharaja Mac Burger",
    category: "Main Course",
    description: "Double patty, extra cheese, and our secret spicy sauce.",
    originalPrice: 250,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    rating: 4.8
  },
  {
    name: "Paneer Tikka Pizza",
    category: "Main Course",
    description: "Authentic tandoori paneer on a cheesy crust.",
    originalPrice: 450,
    isSpecialOffer: true, // Special Offer
    discountedPrice: 399,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    rating: 4.5
  },
  {
    name: "Choco Lava Cake",
    category: "Dessert",
    description: "Molten chocolate inside a soft cake shell.",
    originalPrice: 150,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=800&q=80",
    rating: 4.9
  },
  {
    name: "Mojito Mocktail",
    category: "Drinks",
    description: "Refreshing mint and lemon cooler.",
    originalPrice: 120,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    rating: 4.2
  }
];

// 2. Staff Data (Admin User)
const sampleStaff = [
  {
    username: "admin",
    password: "123", // Simple Password for Viva
    name: "Main Manager",
    role: "Manager"
  },
  {
    username: "chef",
    password: "123",
    name: "Sanjeev Chef",
    role: "Head Chef"
  }
];

// Function to Import Data
const importData = async () => {
  try {
    // Clear Old Data
    await Food.deleteMany();
    await Staff.deleteMany();
    
    console.log('🗑️  Old Data Cleared...');

    // Insert New Data
    await Food.insertMany(sampleFoods);
    await Staff.insertMany(sampleStaff);
    
    console.log('✅ Data Imported Successfully!');
    console.log('👉 Admin Login: username="admin", password="123"');
    
    process.exit();
  } catch (error) {
    console.error("❌ Error Importing Data:", error);
    process.exit(1);
  }
};

importData();