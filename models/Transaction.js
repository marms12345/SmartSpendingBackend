const mongoose = require('mongoose');

// Schema for a transaction
const transactionSchema = new mongoose.Schema({
  transactionNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    max: 100000 // Max limit ₹1,00,000
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String, // Stored as locale string
    required: true
  }
});

// Create model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
