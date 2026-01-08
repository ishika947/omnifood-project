const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// 1. GET RESTAURANT DETAILS
router.get('/', async (req, res) => {
  try {
    // Fetch the first restaurant entry (assuming single branch)
    const info = await Restaurant.findOne();
    if (info) {
      res.json(info);
    } else {
      res.json({ message: "No restaurant info found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. CREATE/UPDATE INFO (Run this once via Postman to set up data)
router.post('/', async (req, res) => {
  try {
    const newInfo = new Restaurant(req.body);
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;