// server/src/config/db.js
// Database configuration file
const mongoose = require('mongoose');

// Database connection setup
async function connectDB() {
    try { // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) { // Handle connection errors
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }   
}

module.exports = connectDB;