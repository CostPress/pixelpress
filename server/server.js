const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

const PORT = 5000;

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Allow JSON data
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "PixelPress server is running!",
  });
});
// API test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Hello from the PixelPress backend!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`PixelPress server running on http://localhost:${PORT}`);
});