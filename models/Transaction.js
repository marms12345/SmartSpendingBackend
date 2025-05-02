const mongoose = require('mongoose');

// Schema for a transaction
const transactionSchema = new mongoose.Schema({
  transactionNumber: {
    type: String,
    required: true,
    match: [/^\d{4}$/, 'Transaction number must be exactly 4 digits']
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
    type: Date,
    default: Date.now,
  }
});

// Create model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
