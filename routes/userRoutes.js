const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.post("/", async (req, res) => {
  try {
    console.log("User details :::", req.body);
    const user = await userModel.create(req.body);
    res.status(201).json({ sucess: true, data: user });
  } catch (error) {
    console.log("Error :::", error);
    res.status(500).json({ sucess: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    console.log("users :::", users);
    res.json({ success: true, data: users });
  } catch (error) {
    console.log("Error :::", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    console.log("Error :::", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: updateUser });
  } catch (error) {
    console.log("Error :::", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deleteUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: deleteUser });
  } catch (error) {
    console.log("Error :::", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
