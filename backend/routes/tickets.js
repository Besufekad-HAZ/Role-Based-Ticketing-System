// filepath: /home/bese/All projects/Role-Based-Ticketing-System/backend/routes/tickets.js
const router = require('express').Router();
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/auth'); // implement JWT check

// POST /tickets
router.post('/', authMiddleware, async (req, res) => {
  // ...create ticket linked to user...
});

// GET /tickets
router.get('/', authMiddleware, async (req, res) => {
  // ...retrieve tickets based on role...
});

// PUT /tickets/:id
router.put('/:id', authMiddleware, async (req, res) => {
  // ...admin updates ticket status...
});

module.exports = router;
