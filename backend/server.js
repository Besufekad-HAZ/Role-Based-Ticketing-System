// filepath: /home/bese/All projects/Role-Based-Ticketing-System/backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");

app.use(cors());
app.use(express.json());

// MongoDB Connection - use env variable MONGODB_URI if available
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ticketing";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
