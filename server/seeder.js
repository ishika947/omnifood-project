const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');
const connectDB = require('./db');

dotenv.config();
connectDB();

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
    isSpecialOffer: true, // UNIQUE FEATURE
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
  }
];

const importData = async () => {
  try {
    await Food.deleteMany(); // Clear old data
    await Food.insertMany(sampleFoods);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();