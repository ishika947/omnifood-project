const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Starter", "Main Course"
  description: { type: String },
  originalPrice: { type: Number, required: true },
  
  // --- UNIQUE FEATURE: Special Offers Logic ---
  isSpecialOffer: { type: Boolean, default: false },
  discountedPrice: { type: Number }, // Only used if isSpecialOffer is true
  
  // --- UNIQUE FEATURE: Visual Appeal ---
  image: { type: String, required: true }, // We will store the Image URL here
  rating: { type: Number, default: 4.5 },
  
  // For "Smart Recommendations"
  tags: [String] // e.g., ["spicy", "cheese", "bestseller"]
});

module.exports = mongoose.model('Food', FoodSchema);