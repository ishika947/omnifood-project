const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// 1. GET ALL FOOD ITEMS (The Menu)
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2. UNIQUE FEATURE: GET "SPECIAL OFFERS" ONLY
// This is for the "Hot Deals" section on your homepage
router.get('/specials', async (req, res) => {
  try {
    const specials = await Food.find({ isSpecialOffer: true });
    res.json(specials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 3. ADD NEW FOOD (Admin Only - simplified for now)
router.post('/', async (req, res) => {
  try {
    const newFood = new Food(req.body);
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;