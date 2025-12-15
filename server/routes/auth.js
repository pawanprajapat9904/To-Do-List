const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User"); 

const router = express.Router();

router.post("/login-or-register", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });
    return res.json({ message: "Account created & logged in" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({ message: "Login successful" });
});

module.exports = router;
