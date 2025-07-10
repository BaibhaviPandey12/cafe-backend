import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

//  Corrected cluster address: from qjxhv → cozci3l
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.cozci3l.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8083, () => {
      console.log(" Server started on port 8083");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });

app.use("/api/user", userRouter);
