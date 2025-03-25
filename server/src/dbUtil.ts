import { Auth, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

interface AuthHeader extends Request {
    user?: any,
}

let client: MongoClient;

export const connectDb = async () => {
    try {
        if (!client) {
            client = new MongoClient(process.env.MONGO_DB_URL as string, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });

            await client.connect();
        }
        return client;
    } catch (e) {
        console.log("error while connecting client: ", e);
    }
}

export const hashPassword = async (password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (e) {
        console.log("error while hashing password");
    }
}

export const checkPassword = async (password: string, hashedPassword: string) => {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (isPasswordValid) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log("error while comparing password");
    }
}

export const verifyToken = (req: AuthHeader, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Forbidden: Invalid token" });
                }

                req.user = decoded;
                next();
            })
        }
    } catch (e) {
        console.error("Token verification error:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
