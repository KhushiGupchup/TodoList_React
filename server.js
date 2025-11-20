// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api", require("./routes/todoRoutes"));

// Server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
