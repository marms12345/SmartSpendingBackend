// const mongoose = require('mongoose');

// // Schema for a user
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Prevents duplicate emails
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// // Create model from schema
// const User = mongoose.model('User', userSchema);

// module.exports = User; 
//################  while trying to do the Web application using react js we are considering the below schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    //#################### remove this when the react component is ready
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
    //#################### use this when the react component is ready
    // enum: ['user', 'admin'],
    // default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

