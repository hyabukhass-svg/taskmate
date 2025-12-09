// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const pool = require("./db"); // your PostgreSQL pool
const taskRoutes = require("./routes/tasks");

const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(cors());
app.use(express.json());

// ------------------------
// Test DB route
// ------------------------
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// ------------------------
// Quotes route using QuoteSlate
// ------------------------
app.get("/quote", async (req, res) => {
  try {
    const response = await axios.get(
      "https://quoteslate.vercel.app/api/quotes/random"
    );
    res.json(response.data); // { quote: "...", author: "..." }
  } catch (err) {
    console.error("Error fetching quote:", err);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ------------------------
// Tasks API routes
// ------------------------
app.use("/tasks", taskRoutes);

// ------------------------
// Serve React frontend
// ------------------------
const frontendBuildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendBuildPath));

// Fallback route for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});


// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
