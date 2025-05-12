const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Helper to generate next 4-digit transaction number
const generateTransactionNumber = async () => {
    const lastTransaction = await Transaction.findOne().sort({ transactionNumber: -1 });

    let nextNumber = 1;
    if (lastTransaction) {
        nextNumber = parseInt(lastTransaction.transactionNumber) + 1;
    }

    if (nextNumber > 1000) {
        throw new Error("Transaction limit reached (Max: 1000)");
    }

    return nextNumber.toString().padStart(4, '0');
};

// POST /expense/transaction
router.post('/transaction', async (req, res) => {
    try {
        const { amount, description, category } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const transactionNumber = await generateTransactionNumber();

        const newTransaction = new Transaction({
            transactionNumber,
            amount,
            description,
            category,
            date: new Date()
        });

        await newTransaction.save();
        res.status(201).json({
            message: 'Transaction saved successfully',
            transaction: {
                transactionNumber: newTransaction.transactionNumber,
                amount: newTransaction.amount,
                description: newTransaction.description,
                category: newTransaction.category,
                date: newTransaction.date
            }
        });
    } catch (err) {
        console.error('Error saving transaction:', err.message);
        res.status(500).json({ error: err.message || 'Failed to save transaction' });
    }
});

// GET /expense/retrieval - retrieve all transactions
router.get('/retrieval', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });

        // Format each transaction like your POST response
        const formattedTransactions = transactions.map(txn => ({
            transactionNumber: txn.transactionNumber,
            amount: txn.amount,
            description: txn.description,
            category: txn.category,
            date: txn.date
        }));

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            transactions: formattedTransactions
        });
    } catch (err) {
        console.error('Error fetching transactions:', err.message);
        res.status(500).json({ error: err.message || 'Failed to fetch transactions' });
    }
});


module.exports = router;
