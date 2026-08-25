const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

// Test authentication routes
router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes are working!",
  });
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    console.log("Signup request received:");
    console.log({
      fullName,
      email,
    });

    // Check required fields
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // Check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role, created_at`,
      [fullName, email, hashedPassword]
    );

    // Successful response
    res.status(201).json({
      message: "Signup successful!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Something went wrong while creating your account.",
    });
  }
});

module.exports = router;