import express from "express";
import authRoute from "./routes/authRoute";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // your React frontend
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use(cookieParser());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})