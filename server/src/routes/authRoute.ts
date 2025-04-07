import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword, checkPassword, connectDb } from "../dbUtil";

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
    try {
        const dbConn = await connectDb();
        if(!dbConn) return res.status(500).send({message: "Connection to database failed"});

        const db = dbConn.db("TUTORIAL");
        const collection = db.collection("users");

        const { email, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const insertStatus = await collection.insertOne({ email, password: hashedPassword });

        res.status(201).send({ message: "User created successfully, Please login to continue" });
    } catch (e) {
        console.log(e)
    }
})

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const connection = await connectDb();
        if(!connection) return res.status(500).send({message: "Connection to database failed"});

        const db = connection.db("TUTORIAL");
        const users = db.collection("users");
        const refreshTokens = db.collection("refreshTokens");

        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        const isPasswordValid = await checkPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid Password" });
        }

        const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_KEY as string, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_KEY as string, { expiresIn: "7d" });

        await refreshTokens.insertOne({ refreshToken })

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).send({ accessToken });
    } catch (e) {
        console.log(e);
    }
});

router.post("/refresh", async (req: Request, res: Response): Promise<any> => {
    try {
        const connection = await connectDb();
        if(!connection) return res.status(500).send({message: "Connection to database failed"});

        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(403).send({ message: "Refresh token required" });
        }

        const refreshTokens = connection.db("TUTORIAL").collection("refreshTokens");

        const refreshTokenDb = await refreshTokens.findOne({ refreshToken });
        if (!refreshTokenDb) {
            return res.status(401).send({ message: "Invalid refresh token, Please login again" });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string, async (err: any, decoded: any) => {
            if (err) {
                await refreshTokens.deleteOne({ refreshToken });
                return res.status(401).send({ message: "Invalid refresh token, Please login again" });
            }

            const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESS_KEY as string, { expiresIn: "15m" });

            return res.status(200).send({ accessToken });
        })


    } catch (e) {
        console.log(e);
    }
})

router.post("/logout", async (req: Request, res: Response): Promise<any> => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(204).send();
        }

        const connection = await connectDb();
        if(!connection) return res.status(500).send({message: "Connection to database failed"});

        const refreshTokens = connection.db("TUTORIAL").collection("refreshTokens");

        await refreshTokens.deleteOne({ refreshToken });

        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).send({ message: "Logged out successfully" });

    } catch (e) {
        console.log("error in logout", e);
    }
});

export default router;