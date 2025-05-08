//For React Web application

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // If you want to handle cross-origin requests
const app = express();

// Middleware to handle JSON data
app.use(express.json());

// Enable CORS (optional, for front-end requests)
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://swamynaidu1743:E1HUEb6YpQ4eiBZG@mongosmartcluster.arsgusw.mongodb.net/?retryWrites=true&w=majority&appName=mongoSmartCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample route
app.get('/', (req, res) => {
  res.send('✅ API is working');
});

// Importing the auth route for user registration
const authRoute = require('./auth');  // Correct path to your auth.js file

// Using the route for /api/auth path
app.use('/auth', authRoute);

// Define the port for the server to listen
app.listen(5000, '0.0.0.0',()  => {
  console.log("🚀 Server running at http://localhost:5000");
});







//For Mobile Application

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

// // Sample route
// app.get('/', (req, res) => {
//   res.send('✅ API is working');
// });


// // This is our main part-------------------------------------
// // API routes for users and transactions
// const User = require('./models/User');
// const Transaction = require('./models/Transaction');

// // Create a new user (POST request)
// // app.post('/api/users', async (req, res) => {
// //   const { name, email, password } = req.body;  
// //   const newUser = new User({
// //     name,
// //     email,
// //     password
// //   });

// //   try {
// //     await newUser.save();
// //     res.status(201).send('User created successfully!');
// //   } catch (error) {
// //     res.status(400).send('Error creating user');
// //   }
// // });

// // // Get all users (GET request)
// // app.get('/api/users', async (req, res) => {
// //   try {
// //     const users = await User.find();
// //     res.status(200).json(users);
// //   } catch (error) {
// //     res.status(500).send('Error fetching users');
// //   }
// // });
// //################  while trying to do the Web application using react js we are considering the below code

// // Create a new user (POST request)
// app.post('/api/users', async (req, res) => {
//   const { name, email, password } = req.body;  
//   const newUser = new User({
//     name,
//     email,
//     password,
//     role
//   });

//   try {
//     await newUser.save();
//     res.status(201).send('User created successfully!');
//   } catch (error) {
//     res.status(400).send('Error creating user');
//   }
// });

// // Get all users (GET request)
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).send('Error fetching users');
//   }
// });

// // // Create a new transaction (POST request)
// // app.post('/api/transactions', async (req, res) => {
// //   const { amount, description, transactionNumber, date } = req.body;
  
// //   const newTransaction = new Transaction({
// //     amount,
// //     description,
// //     transactionNumber
// //   });

// //   try {
// //     await newTransaction.save();
// //     res.status(201).send('Transaction created successfully!');
// //     // res.status(201).json({
// //     //   amount,
// //     //   description,
// //     //   transactionNumber
// //     // });
// //   } catch (error) {
// //     res.status(400).send('Error creating transaction');
// //   }
// // });

// // // Get all transactions (GET request)
// // app.get('/api/transactions', async (req, res) => {
// //   try {
// //     const transactions = await Transaction.find();
// //     res.status(200).json(transactions);
// //   } catch (error) {
// //     res.status(500).send('Error fetching transactions');
// //   }
// // });

// // Start the server
// app.listen(5000, '0.0.0.0',() => {
//   console.log("🚀 Server running at http://localhost:5000");
// });

