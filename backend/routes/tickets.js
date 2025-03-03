// filepath: /home/bese/All projects/Role-Based-Ticketing-System/backend/routes/tickets.js
const router = require('express').Router();
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/auth'); // implement JWT check

router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const userId = req.user.userId;
    const ticket = new Ticket({ title, description, userId });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const allTickets = await Ticket.find().populate('userId', 'username');
      return res.json(allTickets);
    } else {
      const userTickets = await Ticket.find({ userId: req.user.userId });
      return res.json(userTickets);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { status } = req.body;
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
