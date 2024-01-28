const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  const result = await user.save();
  const { password, ...data } = result.toJSON();
  res.send(data);
});

// Login User
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({ message: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.send({ message: "Success" });
});

router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies("jwt");
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({ message: "Unauthedicated" });
    }
    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();

    res.send(data);
  } catch (e) {
    return res.status(401).send({ message: "Unauthedicated" });
  }
});

// Login User
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.send({ message: "Success" });
});

module.exports = router;
