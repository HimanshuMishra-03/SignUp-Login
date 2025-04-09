// console.log("Om Ganeshay Namah")
// app.get("/", (req, res) => {
//     res.send("Om Ganeshay Namah");
// });
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import User from '../server/models/Model_Name/user.models.js' //User.find(), User.create(), User.findById(), User.deleteOne()
// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken'
import authRoutes from '../server/routes/auth.routes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("MongoDB Connected")}).catch(err => console.log(err))

//signup
// app.post('/api/signup', async (req, res) => {
//   try {
//     const {username, email, password} = req.body

//     const newUser = new User({username, email, password})
//     await newUser.save()
    
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/api/login', async(req, res) => {
//   try {
//     const {email, password} = req.body

//     const user = await User.findOne({email});
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const passMatch = await bcrypt.compare(password, user.password)
//     if (!passMatch) return res.status(401).json({ message: "Invalid credentials" });

//     // 🔑 Generate JWT
//     // const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
//   const token = jwt.sign(
//     {id: user._id, email: user.email},
//     process.env.JWT_SECRET, 
//     { expiresIn : '1m'}
//   )

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.log(error)
//   }
// })

app.use('/api', authRoutes);

const PORT = process.env.PORT
app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${PORT}`));




