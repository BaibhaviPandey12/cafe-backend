import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Debug to check env values
console.log("DBUSER from env:", process.env.DBUSER);
console.log("DBPASS from env:", process.env.DBPASS);

const db_username = encodeURIComponent(process.env.DBUSER);
const db_password = encodeURIComponent(process.env.DBPASS);

//  Use backticks for template string!
mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.cozci3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8083, () => {
      console.log(" Server running on port 8083");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

app.use("/api/users", userRouter);
