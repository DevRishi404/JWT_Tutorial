import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
dotenv.config();

import authRoute from "./routes/authRoute";
import productsRoute from "./routes/productsRoute"

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // your React frontend
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/products", productsRoute);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})