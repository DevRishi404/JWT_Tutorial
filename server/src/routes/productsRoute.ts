import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyToken, connectDb } from "../dbUtil";

const router = Router();

router.get('/getProductsList', verifyToken, async (req: Request, res: Response) : Promise<void> => {
    try {
        const dbConn = await connectDb();
        if(!dbConn) {
            res.status(500).send({message: "Connection to database failed"});
            return;
        }

        const db = dbConn.db("TUTORIAL");
        const products = db.collection("products");

        const list = await products.find({}).toArray();

        res.status(200).send({message: "list successfull", list});
    } catch(e) {
        console.log(e);
    }
})


export default router;