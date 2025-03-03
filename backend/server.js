// filepath: /home/bese/All projects/Role-Based-Ticketing-System/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ticketing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ...ROUTES (will add soon)...

app.listen(5000, () => console.log('Server running on port 5000'));
