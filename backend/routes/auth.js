const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (userExists.rows.length > 0) 
      return res.status(400).json({ message: "Username taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password) VALUES($1, $2)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (result.rows.length === 0)
      return res.status(400).json({ message: "Invalid username or password" });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid username or password" });

    // ✅ Simply return success, no token
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;
