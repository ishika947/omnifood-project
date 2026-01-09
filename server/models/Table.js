const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  tableNo: { type: Number, required: true },
  seats: { type: Number, required: true }, // e.g., 2 seater, 4 seater
  location: { type: String, default: "Main Hall" } // Window Side, Center, etc.
});

module.exports = mongoose.model('Table', TableSchema);