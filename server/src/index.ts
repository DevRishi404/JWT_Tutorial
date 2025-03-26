import express from "express";
import loginRoute from "./routes/loginRoute";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));  

app.use("/auth", loginRoute);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})