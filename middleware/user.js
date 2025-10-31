const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("req.headers ::::", req.headers);
  const token = req.headers.authorization;
  console.log("Protected Token ::", token);
  if (!token) return res.status(401).json({ message: "No token provide" });
  try {
    const decode = jwt.verify(`${token}`, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = protect;
