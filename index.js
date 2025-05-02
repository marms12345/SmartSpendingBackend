const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://swamynaidu1743:E1HUEb6YpQ4eiBZG@mongosmartcluster.arsgusw.mongodb.net/?retryWrites=true&w=majority&appName=mongoSmartCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample route
app.get('/', (req, res) => {
  res.send('✅ API is working');
});


// This is our main part-------------------------------------
// API routes for users and transactions
const User = require('./models/User');
const Transaction = require('./models/Transaction');

// Create a new user (POST request)
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  
  const newUser = new User({
    name,
    email,
    password
  });

  try {
    await newUser.save();
    res.status(201).send('User created successfully!');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
});

// Get all users (GET request)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Create a new transaction (POST request)
app.post('/api/transactions', async (req, res) => {
  const { amount, description, transactionNumber, date } = req.body;
  
  const newTransaction = new Transaction({
    amount,
    description,
    transactionNumber,
    date
  });

  try {
    await newTransaction.save();
    res.status(201).send('Transaction created successfully!');
  } catch (error) {
    res.status(400).send('Error creating transaction');
  }
});

// Get all transactions (GET request)
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

// Start the server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});





// const User = require('./models/User');
// const Transaction = require('./models/Transaction');

// // Create a new user
// app.post('/api/users', async (req, res) => {
//     const { name, email, password } = req.body;
//     const newUser = new User({
//       name,
//       email,
//       password
//     });
  
//     try {
//       await newUser.save();
//       res.status(201).send('User created successfully!');
//     } catch (error) {
//       res.status(400).send('Error creating user');
//     }
//   });
  
//   // Get all users
//   app.get('/api/users', async (req, res) => {
//     try {
//       const users = await User.find();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).send('Error fetching users');
//     }
//   });
  
//   // Create a new transaction
//   app.post('/api/transactions', async (req, res) => {
//     const { transactionNumber, amount, description, date } = req.body;
//     const newTransaction = new Transaction({
//       transactionNumber,
//       amount,
//       description,
//       date
//     });
  
//     try {
//       await newTransaction.save();
//       res.status(201).send('Transaction created successfully!');
//     } catch (error) {
//       res.status(400).send('Error creating transaction');
//     }
//   });
  
//   // Get all transactions
//   app.get('/api/transactions', async (req, res) => {
//     try {
//       const transactions = await Transaction.find();
//       res.status(200).json(transactions);
//     } catch (error) {
//       res.status(500).send('Error fetching transactions');
//     }
//   });
  




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect('mongodb+srv://swamynaidu1743:E1HUEb6YpQ4eiBZG@mongosmartcluster.arsgusw.mongodb.net/?retryWrites=true&w=majority&appName=mongoSmartCluster', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Test route
// app.get('/', (req, res) => {
//   res.send('✅ API is working');
// });

// // Start server
// app.listen(5000, () => {
//   console.log("🚀 Server running at http://localhost:5000");
// });

// // Importing required dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize Express application
// const app = express();

// // Middleware to parse incoming JSON requests
// app.use(express.json());
// app.use(cors());  // Enables Cross-Origin Request Sharing for the frontend

// // MongoDB connection (replace 'your-mongodb-url' with your actual MongoDB URL)
// mongoose.connect('mongodb+srv://swamynaidu1743:Swamy#91825@mongosmartcluster.arsgusw.mongodb.net/?retryWrites=true&w=majority&appName=mongoSmartCluster', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Sample route to test the server
// app.get('/', (req, res) => {
//   res.send('✅ API is working');
// });

// // Start the server on port 5000
// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });
