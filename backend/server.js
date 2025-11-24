const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// ⭐ Place the test-db route RIGHT HERE
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Routes
const taskRoutes = require("./routes/tasks");
app.use("/tasks", taskRoutes);

// Start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
