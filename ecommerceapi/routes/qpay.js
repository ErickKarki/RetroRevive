const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password }); // Add this log
    const user = await User.findOne({
      username,
    });

    if (!user) {
      console.log("Wrong User Name"); // Add this log

      return res.status(401).json("Wrong User Name");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json("Wrong Password");
    }
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error:", err); // Add this log

    res.status(500).json(err);
  }
});

module.exports = router;
