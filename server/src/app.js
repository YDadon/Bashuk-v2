// server/src/app.js
// Main application file for setting up the Express server
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Authentication API');
});

module.exports = app;