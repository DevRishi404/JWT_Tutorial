import express from "express";
import loginRoute from "./routes/loginRoute";
import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));  

app.use("/auth", loginRoute);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})