const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, default: "OmniFood Prime" },
  address: { type: String, required: true },
  
  // --- UNIQUE FEATURE: Location for Maps ---
  location: {
    lat: { type: Number, required: true }, // Latitude
    lng: { type: Number, required: true }  // Longitude
  },
  
  // --- UNIQUE FEATURE: Ambience Gallery ---
  // Stores URLs of "View", "Space", "Interior" photos
  ambianceImages: [String], 
  
  contactNumber: { type: String },
  isOpen: { type: Boolean, default: true }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);