const router = require("express").Router();
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/authMiddleware");

// POST /tickets → Create a support ticket
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    // Get the logged in user's id from the auth middleware
    const userId = req.user.userId;
    const ticket = new Ticket({ title, description, userId });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /tickets → Retrieve tickets based on role: admin sees all, user sees their own
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const allTickets = await Ticket.find().populate("userId", "username");
      return res.json(allTickets);
    } else {
      const userTickets = await Ticket.find({ userId: req.user.userId });
      return res.json(userTickets);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /tickets/:id → Update ticket status (admins only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
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

module.exports = router;
