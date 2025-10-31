const express = require("express");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const protect = require("../middleware/user");

const router = express.Router();

const gerateToken = (id) => {
  console.log("ID and Sercret :::", id, process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register Details :::", req.body);
    const userExist = await userModel.findOne({ email });
    console.log("userExist ::", userExist);
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await userModel.create(req.body);
    res.status(201).json({
      sucess: true,
      data: { ...user, token: gerateToken(user._id) },
    });
  } catch (error) {
    console.log("Error :::", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log("USER for login ::", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch :::", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password!" });
    }
    const token = gerateToken(user._id);
    res.json({ message: "Login Succesfully!", user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/profile", protect, async (req, res) => {
  console.log("req data from middleware : ", req.user);
  const user = await userModel
    .findById({ _id: req.user.id })
    .select("-password");
  res.json({ message: "Welcome to the MERN Stack", user });
});

module.exports = router;
