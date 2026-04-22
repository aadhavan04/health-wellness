const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // 🔥 import

// 🔥 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
      name,
      email,
      password: hashedPassword // 🔐 encrypted password
    });

    await newUser.save();

    res.json({ message: "User Registered Successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email or Password Incorrect"
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Email or Password Incorrect"
      });
    }

  
    res.json({
      message: "Login Success",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;