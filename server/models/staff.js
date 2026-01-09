const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Viva ke liye simple text rakh rahe hain
  name: { type: String, required: true },
  role: { type: String, default: 'Staff' }, // Manager, Chef, Waiter
  lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', StaffSchema);