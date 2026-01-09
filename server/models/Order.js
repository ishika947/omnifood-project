const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Preparing" }, // Preparing -> Ready -> Served
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);