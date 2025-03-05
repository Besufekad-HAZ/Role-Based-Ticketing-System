const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from "Authorization" header
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied");

  try {
    // Use JWT_SECRET from env variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decoded payload contains userId and role
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

module.exports = authMiddleware;
