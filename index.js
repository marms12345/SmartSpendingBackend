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

// Auth file route i.e., register
app.use('/auth', require('./routes/auth'));

//ForgotPassword route
app.use('/forgot-password', require('./routes/forgot-password')); 

//ResetPassword route
app.use('/reset-password', require('./routes/reset-password'));

//SignIn route
app.use('/signin',require('./routes/signin'));

app.use('/expense',require('./routes/transaction'));

// Define the port for the server to listen
app.listen(5000, '0.0.0.0',()  => {
  console.log("🚀 Server running at http://localhost:5000");
});

