// // routes/auth.routes.js

// import express from "express";
// import { authenticate } from "../middleware/authenticate.js";
// import User from "../models/Model_Name/user.models.js";

// const router = express.Router();

// router.get("/me", authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password"); // no password exposed
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// server/routes/auth.routes.js
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

// Route to generate 2FA secret and QR

// router.get('/2fa/setup', Authenticate, async (req, res) => {
//   try {
//     const email = req.user.email; // ⬅️ comes from decoded JWT in middleware

//     const secret = speakeasy.generateSecret({ name: `MyApp (${email})` });

//     qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
//       if (err) {
//         console.error("QR gen error:", err);
//         return res.status(500).json({ msg: 'Failed to generate QR' });
//       }
//       console.log({ qr: data_url, secret: secret.base32 });

//       res.json({
//         qr: data_url,
//         secret: secret.base32,
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Error generating 2FA setup" });
//   }
// });


// router.post('/2fa/verify', (req, res) => {
//     const { token, secret } = req.body;
  
//     const verified = speakeasy.totp.verify({
//       secret,
//       encoding: 'base32',
//       token,
//     });
  
//     if (verified) {
//       res.json({ verified: true });
//     } else {
//       res.status(400).json({ verified: false, msg: "Invalid token" });
//     }
//   });
  
  

export default router;
