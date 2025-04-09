
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.models.js' //User.find(), User.create(), User.findById(), User.deleteOne()
import { Authenticate } from "../middleware/auth.middleware.js";
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

const router = express.Router();

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser =await User.findOne({email})
    if(existingUser) return res.status(400).json({ message: "Email already in use" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});


// 🛡️ Example protected route
router.get("/me", Authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  });

export default router;
