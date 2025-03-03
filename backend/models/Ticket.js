// filepath: /home/bese/All projects/Role-Based-Ticketing-System/backend/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Open' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Ticket', ticketSchema);
