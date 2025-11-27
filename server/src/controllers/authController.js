// server/src/controllers/authController.js
// Controller functions for authentication (register and login)
const User = require('../models/User'); //? Mongoose model for User
const bcrypt = require('bcryptjs'); //? For hashing passwords
const jwt = require('jsonwebtoken'); //? For generating JWT tokens

// User registration controller
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try { // Check if user already exists 
        const existing = await User.findOne({ email }); // Find user by email
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashed = await bcrypt.hash(password, 10); // Hash the password

        const user = new User.create({ // Create new user
            username,
            email,
            password: hashed,
        });

        res.json({ msg: 'User registered successfully', user_id: user._id }); // Respond with success message
    } catch (error) { // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Server error response
    }
};

// User login controller
exports.login = async (req, res) => {
  try { // Extract email and password from request body
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // Find user by email
    if (!user) return res.status(400).json({ msg: "Invalid credentials" }); // User not found

    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) // Password does not match
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign( // Generate JWT token
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ // Respond with token and user info
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
};