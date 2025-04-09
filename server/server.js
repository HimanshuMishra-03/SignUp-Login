// console.log("Om Ganeshay Namah")
// app.get("/", (req, res) => {
//     res.send("Om Ganeshay Namah");
// });
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from '../server/routes/auth.routes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("MongoDB Connected")}).catch(err => console.log(err))

app.use('/api', authRoutes);

const PORT = process.env.PORT
app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${PORT}`));




